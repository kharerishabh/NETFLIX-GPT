import { API_OPTIONS } from "../utilis/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../redux-store/moviesSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {
    const disptach = useDispatch()
    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?&page=1",
          API_OPTIONS
        );
        const json = await data.json();
        disptach(addNowPlayingMovies(json.results))
      } catch (error) {
        alert(error.message);
      }
    };
    useEffect(() => {
      !nowPlayingMovies && getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;