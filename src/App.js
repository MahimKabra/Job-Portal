import React, { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { StateValue } from "./Context";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [state, dispatch] = StateValue();
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
  }, [state.user]);
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
