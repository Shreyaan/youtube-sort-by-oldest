import React, { use, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Router, useRouter } from "next/router";
import { Video } from "../..";
import axios from "axios";
import { toast } from "react-toastify";
import { VideoCard } from "../../components/VideoCard";
import Loader from "../../components/loader";
import Head from "next/head";

function videos({ videosArray }: { videosArray: Video[] }) {
  const router = useRouter();
  const { channelId } = router.query;
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  let { pageNumber, itemsPerpage } = router.query;

  // validate page number and items per page
  useEffect(() => {
    //if page number > 100 than show error
    if (pageNumber != undefined && typeof pageNumber === "string") {
      if (parseInt(pageNumber as string) > 500) {
        toast.error("Page number can't be greater than 500");
        router.push(`/videos/${channelId}?pageNumber=1&itemsPerpage=50`);
      }
    }
    //if wrong page number than show error
    if (pageNumber != undefined && typeof pageNumber === "string") {
      if (parseInt(pageNumber as string) < 1) {
        toast.error("Page number can't be smaller than 1");
        router.push(`/videos/${channelId}?pageNumber=1&itemsPerpage=50`);
      }
    }
    if (itemsPerpage != undefined && typeof itemsPerpage === "string") {
      if (parseInt(itemsPerpage as string) < 1) {
        toast.error("Items per page can't be smaller than 1");
        router.push(`/videos/${channelId}?pageNumber=1&itemsPerpage=50`);
      }
    }
  }, [pageNumber, itemsPerpage]);

  const [videosOnPage, setVideosOnPage] = React.useState<number>(50);
  let pagenumOnStart = 1;
  const [page, setPage] = React.useState<number>(pagenumOnStart);

  // set number of videos on page
  useEffect(() => {
    if (itemsPerpage != undefined && typeof itemsPerpage === "string") {
      let itemsPerPageTemp = parseInt(itemsPerpage as string);
      if (itemsPerPageTemp > 0 && itemsPerPageTemp <= 500) {
        setVideosOnPage(itemsPerPageTemp);
      }
    }
  }, [itemsPerpage]);

  //set page number on start
  React.useEffect(() => {
    if (pageNumber != undefined) {
      if (typeof pageNumber === "string") {
        if (parseInt(pageNumber as string) > 1)
          pagenumOnStart = parseInt(pageNumber as string);
        setPage(pagenumOnStart);
      }
    }
  }, [pageNumber]);

  let videosOnPageArray = videos.slice(
    -videosOnPage + videosOnPage * page,
    videosOnPage * page
  );

  //calculate total pages
  let totalPages = Math.ceil(videos.length / videosOnPage);
  if (totalPages === 0) {
    totalPages = 1;
  }

  // if page number > total pages than show error
  useEffect(() => {
    if (videos.length > 0) {
      if (pageNumber != undefined && typeof pageNumber === "string") {
        if (parseInt(pageNumber as string) > totalPages) {
          toast.error("Page number can't be greater than total pages");
          router.push(`/videos/${channelId}?pageNumber=1&itemsPerpage=50`);
        }
      }
    }
  }, [pageNumber, totalPages, videos.length]);

  React.useMemo(() => {
    if (typeof videosArray === "undefined" || videosArray?.length === 0) {
      if (channelId) {
        setLoading(true);

        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url:
            "https://ytsbo.anosher.online/api/v1/getSortedVideos/" + channelId,
          headers: {},
        };

        axios(config)
          .then(function (response) {
            setLoading(false);
            let data = response.data.data as Video[];
            setVideos(data);
            if (data.length === 0) {
              toast.error("No videos found or something went wrong");
            }
            if (data.length >= 3000) {
              toast.info(
                "Due to API limitations, only 3000 videos are shown. Sorry 😔"
              );
            }
          })
          .catch(function (error) {
            if (error.response.status === 404) {
              toast.error("No videos found or something went wrong");
            }
            if (error.response.status === 403) {
              toast.error(
                "Youtube API Limit exceeded. Please try again tomorrow"
              );
            }
            toast.error(
              "Something went wrong 😔 Please contact me on twitter @anosherYT"
            );
            console.log(error);
          });
      }
    } else {
      setLoading(false);
      setVideos(videosArray);
    }
  }, [videosArray]);

  return (
    <div>
      <Head>
        <title>Youtube Videos Sorted by Oldest</title>
      </Head>
      <NavBar />
      <div className="hero mt-20 ">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl">Display Youtube videos by the Oldest</h1>

            <p className="my-5">
              {" "}
              Number of videos - {videos.length}{" "}
              {videos?.length > 1 && (
                <span>
                  | Showing {-videosOnPage + videosOnPage * page + 1} to{" "}
                  {videosOnPage * page > videos.length
                    ? videos.length
                    : videosOnPage * page}{" "}
                  <br /> Total pages - {totalPages}
                </span>
              )}
            </p>
            {loading && (
              <div className="text-2xl my-10">
                <p className="mb-4">
                  Loading videos.... This may take some time
                </p>
                <Loader />
              </div>
            )}
            {videos && videos.length > 0 && (
              <div className="videosList flex items-center justify-center flex-col">
                {videosOnPageArray.slice(0, 100).map((video) => (
                  <VideoCard video={video} key={video.contentDetails.videoId} />
                ))}
              </div>
            )}
            {videos?.length > 0 && (
              <div className="btn-group grid grid-cols-2">
                <button
                  className={`btn btn-outline ${
                    page === 1 && "disabled text-gray-600"
                  }`}
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                      window.scrollTo(0, 0);

                      router.push(
                        {
                          query: {
                            channelId,
                            pageNumber: page - 1,
                            itemsPerpage: videosOnPage,
                          },
                        },
                        `/videos/${channelId}?pageNumber=${
                          page - 1
                        }&itemsPerpage=${videosOnPage}`,
                        { shallow: true }
                      );
                    }
                  }}
                >
                  Previous page
                </button>
                {videosOnPageArray.length === videosOnPage && (
                  <button
                    className={`btn btn-outline ${
                      videosOnPageArray.length != videosOnPage &&
                      "disabled text-gray-600"
                    }`}
                    onClick={() => {
                      if (videosOnPageArray.length === videosOnPage) {
                        setPage(page + 1);
                        window.scrollTo(0, 0);
                        // change url to show page number in url without reloading
                        router.push(
                          {
                            query: {
                              channelId,
                              pageNumber: page + 1,
                              itemsPerpage: videosOnPage,
                            },
                          },
                          `/videos/${channelId}?pageNumber=${
                            page + 1
                          }&itemsPerpage=${videosOnPage}`,
                          { shallow: true }
                        );
                      }
                    }}
                  >
                    Next page
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default videos;

const channels = [
  ["pewdiepie", "UC-lHJZR3Gqxm24_Vd_AJ5Yw"],
  ["ltt", "UCXuqSBlHAE6Xw-yeJA0Tunw"],
  ["some ordinary games", "UCtMVHI3AJD4Qk4hcbZnI9ZQ"],
  ["muse asia", "UCGbshtvS9t-8CW11W7TooQg"],
  ["penguinz0", "UCq6VFHwMzcMXbuKyG7SQYIg"],
];

export async function getStaticPaths() {
  const paths = channels.map((channel) => ({
    params: { channelId: [channel[1]] },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({
  params,
}: {
  params: { channelId: string[] };
}) {
  const channelId = params.channelId[0];

  //check if channel id is in channels array
  const channel = channels.find((channel) => channel[1] === channelId);
  if (!channel) {
    return {
      props: {
        videosArray: [],
      },
      revalidate: 60 * 60 * 24 * 10,
    };
  }
  // Fetch a list of videos for the given channel ID
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url:
      "https://ytsbo.anosher.online/api/v1/getSortedVideosNOLIMIT/" + channelId,
    headers: {},
  };
  const response = await axios(config);
  let data = response.data.data as Video[];
  const videos = data;

  return {
    props: {
      videosArray: videos,
    },
    revalidate: 60 * 60 * 24 * 5, // Cache for 5 days
  };
}
