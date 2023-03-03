import axios from "axios";
import { key } from "../utils/index.js";
import NodeCache from "node-cache";
import { database } from "../index.js";
import { get, ref, set } from "firebase/database";
let limitOfvideos = 3000;
const myCache = new NodeCache();
export async function getSortedVideos(req, res) {
    const { id } = req.params;
    if (id === undefined) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    // increment count for this channel
    try {
        const channelRef = ref(database, `channels/${id}`);
        const channelSnapshot = await get(channelRef);
        if (channelSnapshot.exists()) {
            const currentCount = channelSnapshot.val().count || 0;
            await set(channelRef, { count: currentCount + 1 });
        }
        else {
            await set(channelRef, { count: 1 });
        }
    }
    catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Internal Server Error" });
    }
    if (myCache.has(id)) {
        let data = myCache.get(id);
        if (data === undefined) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        if (data)
            res.json({ data: myCache.get(id), length: data.length });
        return;
    }
    let KEY = key();
    let videosData;
    let videosArray = [];
    let videosArrayLen;
    const videos = [];
    async function getVideos(pageToken, channelId, firstTime = false) {
        let str = channelId;
        str = str.split("");
        str[1] = "U";
        str = str.join("");
        channelId = str;
        if (firstTime === true) {
            videosArray = [];
        }
        var config = {
            url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${channelId}&maxResults=100&key=${KEY}&pageToken=${pageToken}`,
            method: "get",
            headers: {
                Authorization: `${KEY}`,
                Accept: "application/json",
                Referer: "https://yt-old-videos.vercel.app",
            },
        };
        try {
            videosData = await axios(config);
            if (videosData === undefined) {
                return [];
            }
            if (videosArray.length < 1 && videosData.data.items.length < 1) {
                return [];
            }
            let newVideos = videosData.data.items;
            //remove unnecessary data
            newVideos = newVideos.map((video) => {
                return {
                    snippet: {
                        title: video.snippet.title,
                        description: video.snippet.description.slice(0, 200),
                        publishedAt: video.snippet.publishedAt,
                        thumbnails: video.snippet.thumbnails,
                    },
                    contentDetails: {
                        videoId: video.contentDetails.videoId,
                    },
                };
            });
            videosArray.push(...newVideos);
        }
        catch (error) {
            if (error.response?.data.error.code === 403) {
                res.status(403).json({ message: "API Key Quota Exceeded" });
                return false;
            }
            console.log(error);
            console.log(error.response?.data);
            return [];
        }
        if (videosData?.data.nextPageToken !== undefined &&
            videosArray.length < limitOfvideos) {
            videosArrayLen = videosArray.length;
            let data = await getVideos(videosData.data.nextPageToken, channelId);
            videosArrayLen = videosArray.length;
        }
        return videosArray;
    }
    let data = await getVideos("", id, true);
    if (data === false) {
        return; // 403 error already sent
    }
    let dataRev = data.reverse();
    myCache.set(id, dataRev, 3600 * 2);
    res.json({ data: dataRev, length: data.length });
}
export async function getSortedVideosNOLIMIT(req, res) {
    const { id } = req.params;
    if (id === undefined) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    let KEY = key();
    let videosData;
    let videosArray = [];
    let videosArrayLen;
    const videos = [];
    async function getVideos(pageToken, channelId, firstTime = false) {
        let str = channelId;
        str = str.split("");
        str[1] = "U";
        str = str.join("");
        channelId = str;
        if (firstTime === true) {
            videosArray = [];
        }
        var config = {
            url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${channelId}&maxResults=100&key=${KEY}&pageToken=${pageToken}`,
            method: "get",
            headers: {
                Authorization: `${KEY}`,
                Accept: "application/json",
                Referer: "https://yt-old-videos.vercel.app",
            },
        };
        try {
            videosData = await axios(config);
            if (videosData === undefined) {
                return [];
            }
            if (videosArray.length < 1 && videosData.data.items.length < 1) {
                return [];
            }
            videosArray.push(...videosData.data.items);
        }
        catch (error) {
            if (error.response?.data.error.code === 403) {
                res.status(403).json({ message: "API Key Quota Exceeded" });
                return false;
            }
            console.log(error);
            console.log(error.response?.data);
            return [];
        }
        if (videosData?.data.nextPageToken !== undefined &&
            videosArray.length < 7000) {
            videosArrayLen = videosArray.length;
            let data = await getVideos(videosData.data.nextPageToken, channelId);
            videosArrayLen = videosArray.length;
        }
        return videosArray;
    }
    let data = await getVideos("", id, true);
    if (data === false) {
        return;
    }
    res.json({ data: data.reverse(), length: data.length });
}
//# sourceMappingURL=getSortedVideos.js.map