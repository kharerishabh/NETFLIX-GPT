import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utilis/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utilis/firebase";
import { BGIMG } from "../utilis/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux-store/userSlice";
import PHOTO from "../utilis/icon.png";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    //Validation the form
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    //Making API for SignUP & SignIn & Updateuser
    if (!isSignInForm) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;
        //Update Profile
        try{
          await updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO
          })
          const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL
              })
            );
        }catch(error){
          setErrorMessage(error.message)
        }
          console.log(user)
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + errorMessage);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        console.log(user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + errorMessage);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          className="fixed h-screen md:h-auto object-cover"
          src={BGIMG}
          alt="bg-img"
        />
      </div>
      <form className="rounded-md absolute p-4 bg-gray-900 opacity-80 w-6/12 md:w-3/12 my-32 mx-auto left-0 right-0 text-white">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign UP"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full rounded-md bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-2 my-2 w-full rounded-md bg-gray-700"
          ref={email}
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-2 w-full rounded-md bg-gray-700"
        />
        <p className="text-lg text-red-500 py-2 font-bold">{errorMessage}</p>
        <button
          className="bg-red-700 rounded-lg p-2 my-4 w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign UP"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
