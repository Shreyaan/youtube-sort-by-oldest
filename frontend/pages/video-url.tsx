import React from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import router from "next/router";
import Loader from "../components/loader";

function VideoUrl() {
  const [input, setInput] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  function getChannelId() {
    var data = JSON.stringify({
      url: input,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://ytsbo.anosher.online/api/v1/getChannelIdFromVideoUrl",
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
        if (error.response.status === 403) {
          toast.error(
            "Api limit exceeded please try again after 24 hours or try using channel url"
          );
          setLoading(false);
          return;
        }
        setLoading(false);
        toast.error("Invalid Url");
        console.log(error);
      });
  }
  return (
    <div>
      <NavBar />
      <div className="hero mt-20 ">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl">Display Youtube videos by the Oldest</h1>

            <div className="flex flex-wrap mt-10 items-center justify-center gap-1">
              <input
                type="text"
                name="video-url"
                placeholder="eg: https://www.youtube.com/watch?v=TJ2ifmkGGus"
                className="input input-bordered w-full max-w-xs"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-primary" onClick={getChannelId}>
                {loading ? <Loader /> : "Get Videos"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUrl;
