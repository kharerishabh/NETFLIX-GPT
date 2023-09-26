import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utilis/Constants'
import { addupcomingMovies } from '../redux-store/moviesSlice'

const useUpcomingMovies = () => {
  const disptach = useDispatch()

  const upcomingMovies = useSelector(store => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    try{
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS)

        const json = await data.json()
        disptach(addupcomingMovies(json.results))
    }catch(err){console.log(err.message)}
  }
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies()
  }, [])
}

export default useUpcomingMovies