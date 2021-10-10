import { createUserWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    age: "",
    speciality: "",
    protfolioURL: "",
    profilePhoto: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // storing the user details in userData state
  let inputName, value;
  const handleChange = (e) => {
    inputName = e.target.name;
    value = e.target.value;
    if (inputName !== "password") {
      setUserData((prev) => {
        return {
          ...prev,
          [inputName]: value,
        };
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      // storing the useData(user details) in the firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);

      setInput(() => {
        return {
          email: "",
          password: "",
        };
      });
      setUserData(() => {
        return {
          displayName: "",
          email: "",
          age: "",
          speciality: "",
          protfolioURL: "",
        };
      });
      handleClose();
      toast("Account Registered", {
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
    <>
      {/* <!-- Button trigger modal --> */}
      <Button variant="light" onClick={handleShow}>
        Register
      </Button>

      {/* <!-- Modal --> */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="px-sm-4 py-2">
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="modal-title" id="loginLabel">
                Register Form
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  placeholder="Enter your Name"
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  name="displayName"
                  value={userData.displayName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="registerEmail" className="form-label">
                  Email address
                </label>
                <input
                  placeholder="Enter your Email Address"
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  aria-describedby="emailHelp"
                  name="email"
                  value={input.email}
                  onChange={(e) => {
                    setInput((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                    handleChange(e);
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  placeholder="Enter Password"
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  name="password"
                  value={input.password}
                  onChange={(e) => {
                    setInput((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  placeholder="Enter your Age"
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="speciality" className="form-label">
                  Speciality
                </label>
                <input
                  placeholder="Enter your Speciality (What type of work do you want?)"
                  type="text"
                  className="form-control"
                  id="speciality"
                  name="speciality"
                  value={userData.speciality}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="protfolioURL" className="form-label">
                  Protfoilio Url
                </label>
                <input
                  placeholder="Give your Protfolio Link"
                  type="url"
                  className="form-control"
                  id="protfolioURL"
                  name="protfolioURL"
                  value={userData.protfolioURL}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-dark">
                Register
              </button>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Register;
