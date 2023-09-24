import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMoviesSuggestion from './GPTMoviesSuggestion'
import { BGIMG } from '../utilis/Constants'
const GPTSearch = () => {
  return (
    <div>
        <div className="absolute w-full -z-10">
        <img
          className="fixed h-screen md:h-auto object-cover"
          src={BGIMG}
          alt="bg-img"
        />
      </div>
        <GPTSearchBar/>
        <GPTMoviesSuggestion/>
    </div>
  )
}

export default GPTSearch