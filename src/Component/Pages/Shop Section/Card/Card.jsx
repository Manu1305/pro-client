import React from "react";
import "./Card.css";
import { IoIosHeartEmpty } from "react-icons/io";
import modelImg from "../Images/Model.png";
import { useNavigate } from "react-router-dom";

const Card = ({ items }) => {

  const navigate = useNavigate()
  return (
    <div className="product-card cursor-pointer" key={items._id} onClick={() =>navigate(`/ViewDetails/${items._id}`)}>
      <div className="card-wrapper">
        {items?.image[0] ? (
          <img src={items.image[0]} alt="" />
        ) : (
          <img src={modelImg} alt="" />
        )}
        <IoIosHeartEmpty className="heart-icon" />
      </div>

      <div className="card-model-content">
        <p>{items.title}</p>
        <span className="WebRupee">&#x20B9; {items.sellingPrice}</span>
      </div>
    </div>
  );
};

export default Card;
