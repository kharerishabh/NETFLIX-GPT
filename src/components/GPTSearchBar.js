import React from "react";
import { useSelector } from "react-redux";
import language from "../utilis/LanguageConstants";

const GPTSearchBar = () => {
  const languageKey = useSelector(store => store.config.lang)
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12 rounded-sm">
        <input
          className="p-4 m-4 rounded-md col-span-9"
          type="text"
          placeholder={language[languageKey].gptSearchPlaceholder}
        />
        <button className="col-span-3 py-2 px-4 m-4 rounded-lg bg-red-700 text-white">
          {language[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
