import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import language from "../utilis/LanguageConstants";
import openai from "../utilis/openai";
import { API_OPTIONS } from "../utilis/Constants";
import { addGptMovieResult } from "../redux-store/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch()
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //Search GPT movies in TMDB
  const searchMovieTmdb = async (movie) => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTIONS);

      const json = await data.json()
      return json.results
    }catch(err){console.log(err.message)}
  }

  const handlerGptSearchClick = async () => {
    //Make an API Call to GPT API & get Movie Results
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        "only give me name of 5 movies, comma seperated like the examples result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptSearch = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      if(!gptSearch.choices){
        //Error Page
      }
      console.log(gptSearch.choices[0]?.message?.content);
      //It will convert the gptsearch movies in an array
      const gptMovies = gptSearch.choices[0]?.message?.content.split(",")

      //For each movie I will search TMDB API it will return a Promise not results because of async fun
      const promiseArray = gptMovies.map(movie => searchMovieTmdb(movie))

      //Resolving the Array of promise into a single promise and fetching results
      const tmdbResults = await Promise.all(promiseArray)
      console.log(tmdbResults)

      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))

    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12 rounded-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="p-4 m-4 rounded-md col-span-9"
          type="text"
          placeholder={language[languageKey].gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          className="col-span-3 py-2 px-4 m-4 rounded-lg bg-red-700 text-white"
          onClick={handlerGptSearchClick}
        >
          {language[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
