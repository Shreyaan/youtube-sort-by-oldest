import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
       
        <meta name="title" content="Youtube sort by oldest videos" />
        <meta
          name="description"
          content="Youtube recently took away the sort by oldest option on channels so this web app brings it back"
        />
        <meta name="language" content="English" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yt-frontend-jet.vercel.app/show.jpg" />
        <meta property="og:title" content="Youtube sort by oldest videos" />
        <meta
          property="og:description"
          content="Youtube recently took away the sort by oldest option on channels so this web app brings it back"
        />
        <meta property="og:image" content="https://yt-frontend-jet.vercel.app/show.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://yt-old-videos.vercel.app/"
        />
        <meta
          property="twitter:title"
          content="Youtube sort by oldest videos"
        />
        <meta
          property="twitter:description"
          content="Youtube recently took away the sort by oldest option on channels so this web app brings it back"
        />
        <meta property="twitter:image" content="https://yt-frontend-jet.vercel.app/show.jpg" />
      </Head>
      
        <GoogleAnalytics gaMeasurementId="G-1C40RL1VLH" />
      <main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
