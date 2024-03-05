import React, { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import img1 from "../../../images/productupload1.jpg";
import img2 from "../../../images/productupload2.jpg";
import img3 from "../../../images/productupload3.jpg";
import img4 from "../../../images/productupload4.jpg";
import pant1 from "../../../images/pant1.jpg";
import pant2 from "../../../images/pant2.jpg";
import pant3 from "../../../images/pant3.jpg";
import pant4 from "../../../images/pant4.jpg";
import top1 from "../../../images/top1.jpg";
import top2 from "../../../images/top2.jpg";
import top3 from "../../../images/top3.jpg";
import top4 from "../../../images/top4.jpg";
import saree1 from "../../../images/saree1.webp";
import saree2 from "../../../images/saree2.webp";
import saree3 from "../../../images/saree3.webp";
import saree4 from "../../../images/saree4.webp";
import kid1 from "../../../images/kid1.webp";
import kid2 from "../../../images/kid2.webp";
import kid3 from "../../../images/kid3.webp";
import kid4 from "../../../images/kid4.webp";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function UploadImages() {
  const currentProduct = useSelector(state => state.addProductReducer.product)

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const category = "Shirts";
  const Packoff = 2;
  const imageToShow = {
    Shirts: [img1, img2, img3, img4],
    top: [top1, top2, top3, top4],
    Bottom: [top1, top2, top3, top4],
    Sarees: [saree1, saree2, saree3, saree4],
    Kids: [kid1, kid2, kid3, kid4],
    Pants: [pant1, pant2, pant3, pant4],
    Kurtis: [top1, top2, top3, top4],
  };

  const handleImageSelection = (e) => {
    console.log("FIles", e.target.files);
    const selectedImages = e.target.files;
    const previews = [];
    const selected = [];

    for (let i = 0; i < selectedImages.length; i++) {
      selected.push(selectedImages[i]);
      previews.push(URL.createObjectURL(selectedImages[i]));
    }

    setImages((prevImages) => [...prevImages, e.target.files[0]]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const checkCactegory = category ? category : "Shirts";


  const uploadImages = async() => {
    
    if (!images) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a color.",
      });
      return; //
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const formData = new FormData();
    for (const file of images) {
      formData.append("images", file);
    }

    try {
      await httpService
        .post(
          `${apiURL}/product/product_color_images/${currentProduct._id}`,
          formData,
          config
        )
        .then((res) => {
          console.log("SUCCESS RES", res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "The product successfully added",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  }
  return (
    <div>
      <div className="shadow-md bg-gray-50 p-3 mt-6">
        <h2 className="text-xl fw-bold">Example</h2>
        <div className="flex flex-row justify-center items-center">
          {imageToShow[`${checkCactegory}`].map((item) => (
            <div
              className="h-80 w-80 p-2 m-2 text-center"
              style={{ height: "300px", width: "300px" }}
            >
              <img
                className="shadow-md"
                style={{ width: "100%", height: "100%" }}
                src={item}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 bg-white shadow-md">
        <h3 className="m-1 text-xl fw-bold">Product image</h3>
        <br />
        {[...Array(Number(Packoff))]
          .map(() => null)
          .map((item, index) => {
            return (
              <div className="m-4 p-3 flex justify-center">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-50 h-auto border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        click here to upload{" "}
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden border-0"
                    onChange={handleImageSelection}
                    accept="image/*"
                    multiple
                  />
                </label>

                {imagePreviews[index] && (
                  <div className="image-previews flex flex-row">
                    <div className="image-preview">
                      <div className="image-preview">
                        <img
                          src={imagePreviews[index]}
                          alt=""
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            margin: "10px",
                          }}
                        />
                      </div>

                      <div className="flex justify-center">
                        <button
                          className="text-center"
                          onClick={() => {
                            console.log(images);
                            const updatedImages = [...images];
                            updatedImages.splice(0, 1);
                            setImages(updatedImages);

                            const updatedPreviews = [...imagePreviews];
                            updatedPreviews.splice(0, 1);
                            setImagePreviews(updatedPreviews);
                          }}
                        >
                          <MdDeleteSweep
                            style={{
                              display: "flex",
                              height: "40px",
                              alignItems: "center",
                              color: "red",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="mt-5 p-2 flex justify-center items-center gap-4">
        <button
          onClick={uploadImages}
          style={{ background: "#4BB543" }}
          className="py-3 px-[5rem] shadow-md text-md font-medium text-white border-1 border-gray-200"
        >
          Submit
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{ background: "#dc2626" }}
          className="bg-red-600 shadow-md py-3 px-[5rem] text-md font-medium text-white border-1 border-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UploadImages;