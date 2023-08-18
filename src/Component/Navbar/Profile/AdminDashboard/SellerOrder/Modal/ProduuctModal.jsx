import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function ProductModal(props) {
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  // submit reason
  console.log("its props "+props)
  const submitHandler = () => {

      props.onHide();
     
    
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <h1>productid :{props.product._id}</h1>

    <h1>ProductBrand:{props.product.productDetail?.brand}</h1>
    <h1>PRODUCT CATEGORY:{props.product.productDetail?.brand}</h1>
    <h1>REAL PRICE:{props.product.productDetail?.brand}</h1>
    <h1>SUBCATEGORY{props.product.productDetail?.brand}</h1>
    <h1>SELLING PRICE:{props.product.productDetail?.brand}</h1>
    <h1>PRIMARY COLOR:{props.product.productDetail?.brand}</h1>
    <h1>OTHER COLOR:{props.product.productDetail?.brand}</h1>
    <h1>WASHCARE INSTRUCTIONS:{props.product.productDetail?.brand}</h1>
    <h1>MATERIAL:{props.product.productDetail?.brand}</h1>
    <h1>PRODUCT DESCRIPTION:{props.product.productDetail?.brand}</h1>
      <Modal.Footer>
        <Button onClick={submitHandler} className="text-red-300 bg-black">Hide</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;