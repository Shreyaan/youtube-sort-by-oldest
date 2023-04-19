import axios from "axios";
import { Request, Response } from "express";
import { key } from "../utils/index.js";
import cheerio from "cheerio";

const axiosInstance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  },
  validateStatus: () => {
    return true;
  },
});

const checkUrl = (url: string | string[]) =>
  url.indexOf("youtube.com") !== -1 || url.indexOf("youtu.be") !== -1;

const channelIdHandler = async (url: string) => {
  if (checkUrl(url)) {
    let ytChannelPageResponse;
    try {
      ytChannelPageResponse = await axiosInstance.get(url);
    } catch (err) {
      return "";
    }
    const $ = cheerio.load(ytChannelPageResponse.data);

    const id = $('meta[itemprop="channelId"]').attr("content");
    if (id) {
      return id;
    }
  } else {
    return "";
  }

  return "";
};

export async function getChannelIdfromChannelUrl(req: Request, res: Response) {
  let { url } = req.body;
  console.log(url);

  if (url === undefined) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  //   //   getChannelIdFromUrl(url);
  let channelId = await channelIdHandler(url);

  if (channelId === "") {
    res.status(400).json({ message: "Bad Request" });
    return;
  }
  res.status(200).json({ channelId });
}
