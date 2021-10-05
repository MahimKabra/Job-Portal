import React from "react";
import { StateValue } from "../Context";
import "./css/UserDetails.css";

const UserDetails = () => {
  const [state] = StateValue();
  return (
    <>
      <div className="container-fluid">
        <div className="row my-sm-5">
          <div className="col-sm-5 mx-auto">
            <div className="card" style={{ boxShadow: "0px 0px 7px 0px grey" }}>
              <img
                src="https://cdn.pixabay.com/photo/2021/04/25/14/30/man-6206538_960_720.jpg"
                className="card-img-top profile-pic"
                alt="profile"
              />
              <div className="card-body text-center mt-4 mb-2">
                <h2 className="card-title">
                  {state.user?.displayName}
                  {console.log("wdouewgf >>> ", state.user)}
                  {console.log("wdouewgf >>> ", state.user.displayName)}
                </h2>
                <p className="card-text profile-name">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
