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
  console.log(state);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [userDetails, setUserDetails] = useState({
    displayName: state.userData?.displayName,
    email: state.userData?.email,
    age: state.userData?.age,
    speciality: state.userData?.speciality,
    protfolioURL: state.userData?.protfolioURL,
  });
  console.log(userDetails);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleSubmitDp = async (e) => {
    e.preventDefault();
    try {
      console.log("handleSubmitDp has been started");
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

      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };
  const handleSubmitDetails = () => {};

  let inputName, value;
  const handleChangeDetails = (e) => {
    inputName = e.target.name;
    value = e.target.value;
    setUserDetails((prev) => {
      return {
        ...prev,
        [inputName]: value,
      };
    });
  };
  // setUserDetails({
  //   displayName: state.userData?.displayName,
  //   email: state.userData?.email,
  //   age: state.userData?.age,
  //   speciality: state.userData?.speciality,
  //   protfolioURL: state.userData?.protfolioURL,
  // });
  return (
    <>
      <div className="container-fluid">
        <div className="row my-sm-5">
          <div className="col-sm-5 mx-auto">
            <div className="card" style={{ boxShadow: "0px 0px 7px 0px grey" }}>
              <div className="position-relative text-center">
                <img
                  src={
                    state.userData?.profilePhoto
                      ? `${state.userData?.profilePhoto}`
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
                      <form onSubmit={handleSubmitDp}>
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
                    <a href={state.userData?.protfolioURL}>
                      {state.userData?.protfolioURL}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
                {/* <!-- Button trigger modal --> */}
                <Button variant="dark" onClick={handleShow2} className="my-3">
                  Your Account
                </Button>

                {/* <!-- Modal --> */}
                <Modal show={show2} onHide={handleClose2} centered>
                  <div className="px-sm-4 py-2">
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h2 className="modal-title" id="loginLabel">
                          Account Details
                        </h2>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleChangeDetails}>
                        <div className="mb-4">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            placeholder="Enter Name"
                            type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="nameHelp"
                            name="displayName"
                            value={userDetails.displayName}
                            onChange={handleChangeDetails}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="changeEmail" className="form-label">
                            Email address
                          </label>
                          <input
                            placeholder="Enter your Email Address"
                            type="email"
                            className="form-control"
                            id="changeEmail"
                            aria-describedby="emailHelp"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChangeDetails}
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
                            value={userDetails.age}
                            onChange={handleChangeDetails}
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
                            value={userDetails.speciality}
                            onChange={handleChangeDetails}
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
                            value={userDetails.protfolioURL}
                            onChange={handleChangeDetails}
                          />
                        </div>

                        <Button type="submit" variant="dark">
                          Submit
                        </Button>
                      </form>
                    </Modal.Body>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
