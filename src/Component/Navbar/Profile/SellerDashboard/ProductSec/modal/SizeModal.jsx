import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { apiURL } from "../../../../../../const/config";
import httpService from "../../../../../Error Handling/httpService";

function SizeModal({ quantityModal, setQuantityModal, getProducts, product }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  // const sizes = Object.keys(product?.qtyAndSizes);

  console.log(product);
  const changeHandler = (e) => {
    setSelectedSizes((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateStatus = async (event) => {
    event.preventDefault();

    console.log(selectedSizes)

    try {
       await httpService
        .put(`${apiURL}/product/update-seller-product/${product._id}`, {selectedSizes})
        .then((res) => {
          setQuantityModal(false);
          getProducts();
          console.log("RES",res)
          return res;
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
            {product !== null &&
              Object.keys(product.productDetails[0]?.qtyAndSizes).map(
                (size, ind) => (
                  <Row>
                    <Form.Group className="mt-0">
                      <Form.Label>Size {size}</Form.Label>
                      <Form.Control
                        type="number"
                        name={size}
                        placeholder="Enter quanities"
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Row>
                )
              )}
          </Container>

          <div className=" m-2 flex justify-center items-center">
            <button className="bg-emerald-500 w-25 p-1" onClick={updateStatus}>Add</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default SizeModal;
