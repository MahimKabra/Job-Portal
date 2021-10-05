import { signOut } from "@firebase/auth";
import React from "react";
import { auth } from "../firebase";
import "./css/Navbar.css";
import Login from "./Login";
import Register from "./Register";
const Navbar = () => {
  const handleLogout = () => {
    try {
      console.log("sign out has started");
      signOut(auth);
    } catch (err) {
      alert(err.message);
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
            <li className="nav-item mx-3">
              <Login />
            </li>
            <li className="nav-item mx-3">
              <Register />
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
