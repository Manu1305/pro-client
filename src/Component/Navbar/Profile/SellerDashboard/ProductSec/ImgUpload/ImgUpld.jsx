import React, { useState } from "react";

const ImageUploader = ({ value, onChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const filteredImages = selectedImages.filter((image) =>
      image.type.startsWith("image/")
    );
    setImages([...images, ...filteredImages.slice(0, 5 - images.length)]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ width: "150px" }}
      />
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="preview-item">
            <img
              value={value}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              width={50}
              height={50}
              onChange={onChange}
              style={{ width: "2rem", height: "2rem" }}
            />  
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
