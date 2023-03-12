import React, { useState } from "react";
import { Video } from "../..";

export function VideoCard({ video }: { video: Video }) {
  const isoStr1 = video.snippet.publishedAt;

  function parseISOString(s: any) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  function isoFormatDMY(d: {
    getUTCDate: () => any;
    getUTCMonth: () => number;
    getUTCFullYear: () => string;
  }) {
    function pad(n: number) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      pad(d.getUTCDate()) +
      "/" +
      pad(d.getUTCMonth() + 1) +
      "/" +
      d.getUTCFullYear()
    );
  }

  var s = isoStr1;
  var date = parseISOString(s);
  // date = (isoFormatDMY(date))
  let thumbnailUrl;
  if (video.snippet.thumbnails.standard) {
    thumbnailUrl = video.snippet.thumbnails.standard.url;
  } else {
    if (video.snippet.thumbnails.maxres) {
      thumbnailUrl = video.snippet.thumbnails.maxres.url;
    } else {
      if (video.snippet.thumbnails.high) {
        thumbnailUrl = video.snippet.thumbnails.high.url;
      } else thumbnailUrl = video.snippet.thumbnails.default.url;
    }
  }
  return (
    <div className="card  md:w-[95%] max-w-[95vw] text-left lg:card-side bg-base-100 shadow-xl videoCard">
      <figure>
        <img
          loading="lazy"
          className="w-[50vw] md:w-[20vw]"
          src={thumbnailUrl}
          alt="thumbnail"
        />
      </figure>
      <div className="card-body max-w-[95vw] items-center md:items-start overflow-hidden ">
        <h2 className="card-title max-w-[95vw] break-all">
          {video.snippet.title}
        </h2>
        <p className="max-w-[95vw] break-all">
          {video.snippet.description.substring(0, 200)}...
        </p>{" "}
        <br />
        <p> Published at - {date.toDateString()}</p>
        <div className="card-actions w-full justify-center mt-4 md:mt-0 md:justify-end">
          {video.contentDetails !== undefined && (
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`}
              className="btn btn-primary"
            >
              Watch
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
