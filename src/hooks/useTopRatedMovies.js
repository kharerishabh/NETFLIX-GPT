import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utilis/Constants";
import { addTopRatedMovies } from "../redux-store/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
        const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS)

        const json = await data.json()
        dispatch(addTopRatedMovies(json.results))
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTopRatedMovies()
  }, [])
};

export default useTopRatedMovies;
