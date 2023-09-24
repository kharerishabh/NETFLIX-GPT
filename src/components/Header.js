import React, { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utilis/Constants";
import ICON from "../utilis/icon.png";
import { auth } from "../utilis/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../redux-store/userSlice";
import { toggleGptSearchView } from "../redux-store/gptSlice";
import {changeLanguage} from "../redux-store/configSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //for Unscribes when my component unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-3 bg-gradient-to-b from-black z-10 flex md:flex-row justify-between">
      <img className="w-32 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2">
          {showGptSearch && <select className="p-2 bg-gray-900 text-white m-2 rounded-sm" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? 'Home': 'GPT Search'}
          </button>
          <img className="h-12 w-12" src={ICON} alt="user-icon" />
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-red-600 rounded-lg px-2 mb-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
