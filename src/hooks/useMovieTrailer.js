import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utilis/Constants";
import { addTrailerVideo } from "../redux-store/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMoviesVideos = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results;
      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMoviesVideos();
  }, []);
};

export default useMovieTrailer;
