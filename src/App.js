import React, { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import Navbar from "./components/Navbar";
import { StateValue } from "./Context";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// 'file' comes from the Blob or File API

function App() {
  const [, dispatch] = StateValue();

  const getProfile = async () => {
    const storageRef = (storage, `${auth.currentUser?.uid}/profile`);
    try {
      const url = await getDownloadURL(ref(storageRef));
      console.log(url);
      dispatch({
        type: "getProfilePic",
        payload: url,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("user is signed in");
        dispatch({
          type: "setUser",
          payload: user,
        });
        onSnapshot(doc(db, "users", auth.currentUser?.uid), (doc) => {
          dispatch({
            type: "setUserData",
            payload: doc.data(),
          });
        });
        // getProfilPic();
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
    </>
  );
}

export default App;
