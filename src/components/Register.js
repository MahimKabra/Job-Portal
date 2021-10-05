import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Register = () => {
  const [input, setInput] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let inputName, value;
  const handleChange = (e) => {
    inputName = e.target.name;
    value = e.target.value;
    setInput((prev) => {
      return {
        ...prev,
        [inputName]: value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      updateProfile(auth.currentUser, { displayName: input.displayName });
      setInput(() => {
        return {
          displayName: "",
          email: "",
          password: "",
        };
      });
      handleClose();
    } catch (err) {
      alert(err.message);
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
                  value={input.displayName}
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
                  onChange={handleChange}
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
