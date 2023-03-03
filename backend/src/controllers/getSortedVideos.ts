import { Request, Response } from "express";
import { Video } from "../index.d";
import axios, { AxiosResponse } from "axios";
import { key } from "../utils/index.js";

import NodeCache from "node-cache";

import { database } from "../index.js";
import { get, ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";

const myCache = new NodeCache();

type apiRes =
  | {
      data: {
        items: Video[];
        nextPageToken?: string;
      };
    }
  | undefined;

export async function getSortedVideos(req: Request, res: Response) {
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
    } else {
      await set(channelRef, { count: 1 });
    }
  } catch (error: any) {
    console.log(error);
    // res.status(500).json({ message: "Internal Server Error" });
  }

  if (myCache.has(id)) {
    let data: Video[] = myCache.get(id) as Video[];
    if (data === undefined) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    if (data) res.json({ data: myCache.get(id), length: data.length });
    return;
  }

  let KEY = key();
  let videosData: apiRes;
  let videosArray: Video[] = [];
  let videosArrayLen: number;
  const videos: Video[] = [];

  async function getVideos(pageToken: any, channelId: any, firstTime = false) {
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
    } catch (error: any) {
      if (error.response?.data.error.code === 403) {
        res.status(403).json({ message: "API Key Quota Exceeded" });
        return false;
      }
      console.log(error);
      console.log(error.response?.data);
      return [];
    }

    if (
      videosData?.data.nextPageToken !== undefined &&
      videosArray.length < 3000
    ) {
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
export async function getSortedVideosNOLIMIT(req: Request, res: Response) {
  const { id } = req.params;
  if (id === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  let KEY = key();
  let videosData: apiRes;
  let videosArray: Video[] = [];
  let videosArrayLen: number;
  const videos: Video[] = [];

  async function getVideos(pageToken: any, channelId: any, firstTime = false) {
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
    } catch (error: any) {
      if (error.response?.data.error.code === 403) {
        res.status(403).json({ message: "API Key Quota Exceeded" });
        return false;
      }
      console.log(error);
      console.log(error.response?.data);
      return [];
    }

    if (
      videosData?.data.nextPageToken !== undefined &&
      videosArray.length < 7000
    ) {
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
