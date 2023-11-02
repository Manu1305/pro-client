import React from "react";

const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = (event) => {
    onClick(event, { photo, index });
  };

  console.log("photos in img", photo);

  return (
    <img
      width={300}
      style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
      // {...photo}
      src={photo.src}
      onClick={onClick ? handleClick : null}
      alt="img"
    />
  );
};

export default Photo;
