import { signOut } from "@firebase/auth";
import React from "react";
import { toast } from "react-toastify";
import { StateValue } from "../Context";
import { auth } from "../firebase";
import "./css/Navbar.css";
import Login from "./Login";
import Register from "./Register";

const Navbar = () => {
  const [state, dispatch] = StateValue();
  const handleLogout = () => {
    try {
      signOut(auth);
      toast("Logout Successful", {
        position: "bottom-left",
        type: "success",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (error) {
      toast(error.message, {
        position: "bottom-left",
        type: "error",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand title" href="/">
          Job Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!state.user ? (
              <>
                <li className="nav-item mx-3">
                  <Login />
                </li>
                <li className="nav-item mx-3">
                  <Register />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-3">
                  <button className="btn btn-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
