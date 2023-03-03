import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
      <title>Youtube sort by oldest videos</title>
      </Head>
      <NavBar isLandingPage={true}/>
      <div className="hero min-h-[80vh] mt-16 md:mt-8 bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-[90vw] md:max-w-[60vw]">
            <h1 className="text-5xl ">Welcome to Sort Youtube Videos By Oldest</h1>
            <p className="pt-6 pb-6">
                This website is made to help you to sort a youtube channel's videos by oldest,
                because youtube hates its users and has removed the feature 🤕
              </p>
            <p className="pb-6">
             
            To continue press the button below and enter the channel url, video url or shorts url of the channel you want to sort by oldest
            </p>
            <div className="flex justify-center items-center max-w-sm mx-auto gap-5 flex-wrap md:flex-nowrap">
              <Link href='url' className="btn btn-primary rounded-md w-[50%]">Enter Url</Link>
            </div>
            <p className="mt-16 md:mt-8">If you face any problems you can contact me on <a className="link link-primary" href="https://twitter.com/AnosherYT">Twitter</a>  </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
