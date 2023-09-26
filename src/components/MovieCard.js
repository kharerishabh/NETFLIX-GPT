import React from "react";
import { IMG_CDN_URL } from "../utilis/Constants";

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return null
  return (
    <div className="w-48 pr-4">
      <img alt="Movie Poster" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
