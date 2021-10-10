import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import { Row, Col, Container, ToastContainer } from "react-bootstrap";

const MyToast = (props) => {
  // const [showA, setShowA] = useState(false);

  // const toggleShowA = () => setShowA(!showA);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={6} className="mb-2">
            <ToastContainer className="p-3" position={props.position}>
              <Toast show={props.toShow} bg={props.bg} delay={3000} autohide>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Bootstrap</strong>
                  <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyToast;
