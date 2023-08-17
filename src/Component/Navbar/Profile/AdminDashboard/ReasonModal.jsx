import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ReasonModal(props) {
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");


  // alert(props.id)
  // submit reason
  const submitHandler = async () => {
    try {
      props.onHide();
      props.removeFromShop(props.product.id, { heading, desc,email:props.product.seller });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Form.Control
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Enter Reason"
          size="lg"
        />
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Write Descrtiption</Form.Label>
        <Form.Control
          as="textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitHandler}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReasonModal;