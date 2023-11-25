import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ReasonModal(props) {
  const [selectedReason, setSelectedReason] = useState("");
  const [desc, setDesc] = useState("");
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const handleReasonChange = (e) => {
    const reason = e.target.value;
    setSelectedReason(reason);
    setShowDescriptionInput(reason === "Others");
  };

  const submitHandler = async () => {
    try {
      props.onHide();
      props.removeFromShop(props.product.id, {
        heading: selectedReason,
        desc: showDescriptionInput ? desc : "",
        email: props.product.seller,
      });
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
          as="select"
          value={selectedReason}
          onChange={handleReasonChange}
          size="lg"
        >
          <option value="" disabled>Select Reason</option>
          <option value="Product quality bad">Product images quality issue</option>
          <option value="Not fast delivery">Form all are not filled</option>
          <option value="Others">Others</option>
        </Form.Control>
      </Modal.Header>
      {showDescriptionInput && (
        <Modal.Body>
          <Form.Label>Write Reason for reject </Form.Label>
          <Form.Control
            as="textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
          />
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button className="bg-red-700" onClick={submitHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReasonModal;
