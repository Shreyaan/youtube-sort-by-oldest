import Link from "next/link";
import React from "react";

function NavBar({ isLandingPage }: { isLandingPage?: boolean }) {
  return (
    <div>
      <div className="navbar fixed bg-base-100 z-50 bg-opacity-90 backdrop-blur top-0 left-0 justify-between ">
        <div className="">
          {isLandingPage ? (
            <a
              href="https://www.anosher.com"
              target="_blank"
              className="btn btn-ghost normal-case text-xl  underline"
            >
              Made by Anosher
            </a>
          ) : (
            <Link href={"/"} className="btn btn-ghost normal-case text-xl  ">
              ⬅️ Back
            </Link>
          )}
        </div>
        <div className="flex-none">
          {/* <button
        onClick={props.handleClick}
        className="btn btn-circle btn-outline"
      >
        {props.darkMode ? <LightModeImg /> : <DarkmodeImg />}
      </button> */}
          <a
            href="https://www.reddit.com/r/youtube/comments/tx0uln/comment/i3iu7q8/"
            target="_blank"
            className="btn why btn-ghost nomobile"
          >
            Why make this??
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
