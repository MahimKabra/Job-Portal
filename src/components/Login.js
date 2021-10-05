import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

const Login = () => {
  const [input, setInput] = useState({
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
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      if (userCredential) {
        console.log("login successful");
        setInput(() => {
          return {
            email: "",
            password: "",
          };
        });
        handleClose();
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <Button variant="light" onClick={handleShow}>
        Login
      </Button>

      {/* <!-- Modal --> */}
      <Modal show={show} onHide={handleClose} centered>
        <div className="px-sm-4 py-2">
          <Modal.Header closeButton>
            <Modal.Title>
              <h2 className="modal-title" id="loginLabel">
                Login Form
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="loginEmail" className="form-label">
                  Email address
                </label>
                <input
                  active
                  placeholder="Enter your Email Address"
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  aria-describedby="emailHelp"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  placeholder="Enter your Password"
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default Login;
