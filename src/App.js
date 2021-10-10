import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import Navbar from "./components/Navbar";
import { StateValue } from "./Context";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 'file' comes from the Blob or File API

function App() {
  const [, dispatch] = StateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("user is signed in");
        onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
          dispatch({
            type: "setUserData",
            payload: doc.data(),
          });
        });
        dispatch({
          type: "setUser",
          payload: user,
        });
      } else {
        // User is signed out
        dispatch({
          type: "setUser",
          payload: user,
        });
        // ...
        console.log("user is signed out");
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      <Home />

      <ToastContainer />
    </>
  );
}

export default App;
