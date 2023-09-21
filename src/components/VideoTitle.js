import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video bg-gradient-to-r from-black pt-[20%] px-24 absolute text-white">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-md hover:bg-opacity-80">▶ Play</button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-14 text-xl rounded-md bg-opacity-30 hover:bg-opacity-75">ℹ️ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
