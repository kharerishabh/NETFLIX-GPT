import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utilis/Constants";
import { addPopularMovies } from "../redux-store/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies)
  const getPopularMovies = async () => {
    try {
        const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS)

        const json = await data.json()
        dispatch(addPopularMovies(json.results))
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    !popularMovies && getPopularMovies()
  }, [])
};

export default usePopularMovies;
