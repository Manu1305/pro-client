import React, { useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { apiURL } from "../../../../../../const/config";

function SizeModal({ quantityModal, setQuantityModal, getProducts, product }) {
  const [selectedSizes, setSelectedSizes] = useState({});

 
  const changeHandler = (e) => {
    setSelectedSizes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



  const updateStatus = async (event) => {

    event.preventDefault();

    let total;
    for (const key in selectedSizes) {
        total += parseInt(selectedSizes[key], 10);
      }

    try {
        const response = await axios
          .put(`${apiURL}/product/update-seller-product/${product._id}`, {
            size:selectedSizes,
            total
          })
          .then((res) => {
            setQuantityModal(false);
            getProducts();
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
    <div className="mb-3">
      <Modal show={quantityModal} onHide={() => setQuantityModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Add Quntity</Modal.Title>
        </Modal.Header>
        <Form className="mt-2 mb-2 border-0">
          <Container>
            {Object.keys(product.productDetail.selectedSizes).map((sizeKey) => {
              const { selectedSizes } =
                product.productDetail.selectedSizes[sizeKey];
              return (
                <div key={selectedSizes}>
                  {selectedSizes !== undefined && (
                    <>
                      <Row>
                        <Form.Group className="mt-0">
                          <Form.Label>Size {selectedSizes}</Form.Label>
                          <Form.Control
                            type="number"
                            name={selectedSizes}
                            placeholder="Enter quanities"
                            onChange={changeHandler}
                          />
                        </Form.Group>
                      </Row>
                    </>
                  )}
                </div>
              );
            })}
          </Container>

          <Button variant="primary" type="submit" onClick={updateStatus}>
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default SizeModal;