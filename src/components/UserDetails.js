import React, { useEffect, useState } from "react";
import "./css/UserDetails.css";
import { ListGroup, Modal } from "react-bootstrap";
import { StateValue } from "../Context";
import EditIcon from "@material-ui/icons/Edit";
import Button from "react-bootstrap/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const UserDetails = () => {
  const [state, dispatch] = StateValue();
  const [show, setShow] = useState(false);
  console.log(auth.currentUser);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("handleSubmit has been started");
      const storageV = ref(storage, auth.currentUser.uid);
      // const storageH = ref(storageV, auth.currentUser.uid);
      const storageRef = ref(storageV, "profile");
      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, e.target[0].files[0]);
      console.log("file submitted successfullly");

      const url = await getDownloadURL(
        ref(storage, `${auth.currentUser.uid}/profile`)
      );
      // `url` is the download URL for 'images/stars.jpg'

      const userRef = doc(db, "users", auth.currentUser.uid);

      // Set the "capital" field of the city 'DC'
      await updateDoc(userRef, {
        profilePhoto: url,
      });
      // This can be downloaded directly:
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = "blob";
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open("GET", url);
      // xhr.send();

      // Or inserted into an <img> element
      // const img = document.getElementById("myimg");
      // img.setAttribute("src", url);
      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };
  console.log(state.userData?.profilePhoto);
  return (
    <>
      <div className="container-fluid">
        <div className="row my-sm-5">
          <div className="col-sm-5 mx-auto">
            <div className="card" style={{ boxShadow: "0px 0px 7px 0px grey" }}>
              <div className="position-relative text-center">
                <img
                  src={
                    state.userData?.protfolioURL
                      ? `${state.userData?.protfolioURL}`
                      : "images/defaultProfile.png"
                  }
                  // src="images/defaultProfile.png"
                  className="card-img-top profile-pic"
                  alt="profile"
                />
                {/* <!-- Edit trigger modal --> */}
                <span className="position-absolute edit-icon translate-middle badge rounded-pill bg-secondary">
                  <EditIcon onClick={handleShow} />
                </span>
                {/* <!-- Modal --> */}
                <Modal show={show} onHide={handleClose} centered>
                  <div className="px-sm-4 py-2">
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h4 className="modal-title" id="loginLabel">
                          Edit Profile Photo
                        </h4>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                          />
                          <Button variant="dark" type="submit">
                            Upload
                          </Button>
                        </div>
                      </form>
                    </Modal.Body>
                  </div>
                </Modal>
              </div>

              <div className="card-body text-center mt-4 mb-2">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Name: </b>
                    {state.userData?.displayName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Age: </b>
                    {state.userData?.age}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Email Id: </b>
                    {state.userData?.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Speciality: </b>
                    {state.userData?.speciality}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Protfolio: </b>
                    {state.userData?.protfolioURL}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
