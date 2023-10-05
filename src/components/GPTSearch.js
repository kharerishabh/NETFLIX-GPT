import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMoviesSuggestion from "./GPTMoviesSuggestion";
import { BGIMG } from "../utilis/Constants";
const GPTSearch = () => {
  return (
    <>
      <div className="fixed w-full -z-10">
        <img
          className="h-screen object-cover md:h-auto"
          src={BGIMG}
          alt="bg-img"
        />
      </div>
      <div className="">
        <GPTSearchBar />
        <GPTMoviesSuggestion />
      </div>
    </>
  );
};

export default GPTSearch;
