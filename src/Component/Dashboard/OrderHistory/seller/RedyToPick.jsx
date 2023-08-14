import React, {  useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { apiURL } from "../../../../const/config";

function RedyToPick({ id,getOrders }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [packageDetails, setPackageDetails] = useState({});
  const changeHandler = (e) => {
    setPackageDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      const response = await axios
        .put(`${apiURL}/status/redayToPickup/${id}`, {
          packageDetails,
        })
        .then((res) => {
          handleClose();
          getOrders()
          return res
        })
        .catch((err) => {
          console.log(err);
        });
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div >
      <Button style={{color:'black',backgroundColor:'white'}} onClick={handleShow}>
        Ready to pick up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Fill Package Details
          </Modal.Title>
        </Modal.Header>
        <Form className="mt-2 mb-2 border-0">
          <Container>
            <Row>
              <Form.Group className="mt-0">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="number"
                  name="size"
                  placeholder="Enter size"
                  onChange={changeHandler}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-1">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                placeholder="Enter Weight"
                onChange={changeHandler}
              />
            </Form.Group>

            <Row>
              <Form.Group className="mb-1">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  placeholder="Packge Height"
                  onChange={changeHandler}
                />
              </Form.Group>
            </Row>
          </Container>

          <Button variant="primary" type="submit" onClick={updateStatus}>
            confrim
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default RedyToPick;