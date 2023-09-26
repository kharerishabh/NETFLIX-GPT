import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utilis/Constants";
import { addTopRatedMovies } from "../redux-store/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

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
    !topRatedMovies && getTopRatedMovies()
  }, [])
};

export default useTopRatedMovies;
