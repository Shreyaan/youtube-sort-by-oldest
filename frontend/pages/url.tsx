import React from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import router from "next/router";
import Loader from "../components/loader";
import Head from "next/head";

function VideoUrl() {
  const [input, setInput] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);

  function getChannelId() {
    const checkUrl = (url: string | string[]) =>
      url.indexOf("youtube.com") !== -1 || url.indexOf("youtu.be") !== -1;

    if (!checkUrl(input)) {
      toast.error("Invalid Url");
      setInput("");
      return;
    }

    var data = JSON.stringify({
      url: input,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://ytsbo.anosher.online/api/v1/getChannelIdFromChannelUrl",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    setLoading(true);
    axios(config)
      .then(function (response) {
        setLoading(false);
        location.href = `/videos/${response.data.channelId}?pageNumber=1&itemsPerpage=50`;
      })
      .catch(function (error) {
        setLoading(false);
        toast.error("Channel not found or something went wrong.");
        console.log(error);
      });
  }
  return (
    <div>
      <Head>
        <title>Enter url to sort by oldest</title>
      </Head>
      <NavBar />
      <div className="hero mt-20 ">
        <div className="hero-content text-center">
          <div className="max-w-[60vw]">
            <h1 className="text-5xl">Display Youtube videos by the Oldest</h1>

            <div className="flex flex-wrap mt-10 items-center justify-center gap-1">
              <input
                type="text"
                name="channel-url"
                placeholder="Channel or Video Url or Shorts Url eg: https://www.youtube.com/@Anosher"
                className="input input-bordered w-full max-w-xs"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-primary" onClick={getChannelId}>
                {loading ? <Loader /> : "Get Videos"}
              </button>
            </div>
            {/* <p className="mt-4 text-left">
              Valid Urls types <br />
              Channel Urls like{" "}
              <span className="text-gray-300">
                https://www.youtube.com/@Anosher
              </span>{" "}
              or{" "}
              <span className="text-gray-300">
                https://www.youtube.com/channel/UCVFckUyW76NDLk0b-fnLUMg
              </span>{" "}
              <br />
              Video Urls like{" "}
              <span className="text-gray-300">
                https://www.youtube.com/watch?v=TJ2ifmkGGus
              </span>{" "}
              or{" "}
              <span className="text-gray-300">
                https://youtu.be/TJ2ifmkGGus
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUrl;
