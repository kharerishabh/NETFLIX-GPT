import React from "react";
import { LOGO } from "../utilis/Img&logo";
import ICON from "../utilis/icon.png";
import { auth } from "../utilis/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="absolute w-screen px-8 py-3 bg-gradient-to-b from-black z-10 flex md:flex-row justify-between">
      <img className="w-44" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2">
          <img className="h-12 w-12" src={ICON} alt="user-icon" />
          <button
            onClick={handleSignOut}
            className="font-bold rounded-md border bg-white text-black cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
