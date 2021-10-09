import React, { useEffect, useState } from "react";
import "./css/UserDetails.css";
import { ListGroup, Modal } from "react-bootstrap";
import { StateValue } from "../Context";
import EditIcon from "@material-ui/icons/Edit";
import Button from "react-bootstrap/Button";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase";

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
      console.log("defiewhvcouegvo");
      await uploadBytes(storageRef, e.target[0].files[0]);
      console.log("file submitted successfullly");
      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row my-sm-5">
          <div className="col-sm-5 mx-auto">
            <div className="card" style={{ boxShadow: "0px 0px 7px 0px grey" }}>
              <div className="position-relative text-center">
                <img
                  src={
                    auth.currentUser.photoURL
                      ? auth.currentUser.photoURL
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
