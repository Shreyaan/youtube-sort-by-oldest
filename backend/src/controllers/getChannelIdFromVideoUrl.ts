import { Request, Response } from "express";
import axios from "axios";
import { key } from "../utils/index.js";

export async function getChannelIdFromVideoUrl(req: Request, res: Response) {
  let { url } = req.body;
  if (url === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  //   getChannelIdFromUrl(url);
  let channelId = await getChannelIdFromUrl(url);

  if (channelId === "api key quota exceeded") {
    res.status(403).json({ message: "API Key Quota Exceeded" });
    return;
  }
  if (channelId === "") {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  res.status(200).json({ channelId });
}

async function getChannelIdFromUrl(url: string): Promise<string> {
  function youtubeUrlParser(url: string) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  let videoId;

  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1];
  } else {
    videoId = youtubeUrlParser(url);
  }

  if (videoId === false) {
    return "";
  }

  console.log(videoId);
let selectedKey = key();
  var config = {
    method: "get",
    url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${selectedKey}`,
    headers: {
      Authorization: `${selectedKey}`,
      Accept: "application/json",
      Referer: "https://yt-old-videos.vercel.app",
    },
  };

  let channelId = await axios(config)
    .then(function (response) {
      return response.data.items[0].snippet.channelId;
    })
    .catch(function (error) {
      console.log(error.response?.data.error.code);
      console.log(error.response?.data.error.message);
      
      
      if (error.response?.data.error.code === 403) {
        return "api key quota exceeded";
      }
      console.log(error);
      return "";
    });

  return channelId;
}
