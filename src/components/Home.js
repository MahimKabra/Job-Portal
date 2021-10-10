import React from "react";
import { StateValue } from "../Context";
import UserDetails from "./UserDetails";

const Home = () => {
  const [state] = StateValue();
  return (
    <>
      {state.user && state.userData ? (
        <>
          <UserDetails />
        </>
      ) : (
        <h1 className="text-center my-5 py-5 fw-light">
          Please Login Or Register your account
        </h1>
      )}
    </>
  );
};

export default Home;
