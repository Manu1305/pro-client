import React, { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import styles from "./Addproduct.module.css";
import httpService from "../../../../Error Handling/httpService";
import { apiURL } from "../../../../../const/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { InfinitySpin, Watch } from "react-loader-spinner";
import img1 from "../../../../../images/productupload1.jpg";
import img2 from "../../../../../images/productupload2.jpg";
import img3 from "../../../../../images/productupload3.jpg";
import img4 from "../../../../../images/productupload4.jpg";

// sort images
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "./Photo";

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

function Section2({
  sizeSelected,
  productInfo,
  setSecondModal,
  productId,
  productDetails,
  setProductDetails,
}) {
  const [color, setColor] = useState("");
  const [qtyAndSizes, setQtyAndSizes] = useState({});
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [index, setIndex] = useState(0);


  const photos =productDetails.length !==0&& productDetails[index].images.map((item) => {
    return { src: item, width: 2, height: 1 };
  });
  


  const [totQut, setTotQut] = useState(0);
  const [loader, setLoader] = useState(true);
  const [items, setItems] = useState(photos);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };
  const handleImageSelection = (e) => {
    const selectedImages = e.target.files;
    const previews = [];
    const selected = [];

    for (let i = 0; i < selectedImages.length; i++) {
      selected.push(selectedImages[i]);
      previews.push(URL.createObjectURL(selectedImages[i]));
    }

    setImages((prevImages) => [...prevImages, ...selected]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const submitHandler = async () => {
    setLoader(false);

    if (!color) {
      // Color is empty
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select a color.",
      });
      setLoader(true);
      return; //
    }

    if (images.length === 0) {
      // No images selected
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select at least one image.",
      });
      setLoader(true);
      return; //
    }
    if (images.length > 4) {
      // More than 4 images selected
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "You can only add up to 4 images.",
      });
      setLoader(true);
      return; //
    }
    if (totQut < 5) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Total Quantity should be greater than 4",
      });
      setLoader(true);
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
    formData.append("qtyAndSizes", JSON.stringify(qtyAndSizes));
    formData.append("color", color);

    try {
      await httpService
        .put(
          `${apiURL}/product/product_color_images/${productId}`,
          formData,
          config
        )
        .then((res) => {
          console.log("SUCCESS RES", res.data);
          setColor("");
          setImages([]);
          setImagePreviews([]);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "The product successfully added",
            showConfirmButton: false,
            timer: 1000,
          });
          setLoader(true);
        })
        .catch((err) => {
          console.log(err);
          setLoader(true);
        });
    } catch (error) {
      console.log("ERROR", error);
      setLoader(true);
    }
  };

  useEffect(() => {
    const quantity =
      Object.values(qtyAndSizes).length &&
      Object.values(qtyAndSizes).reduce((acc, curr) => acc + curr);
    setTotQut(quantity);
  }, [qtyAndSizes]);

  return (
    <div className="bg-gray">
      <div className="bg-white mt-2 p-2">
        <label
          for="color"
          className="block m-2 text-sm fw-bolder font-medium text-gray-900 dark:text-white"
        >
          Colors
        </label>

        <input
          style={{ height: "50px", width: "300px" }}
          type="color"
          id="color"
          className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={
            Object.values(productDetails).length !== 0? productDetails[0].color : color
          }
          name="color"
          onChange={(e) => setColor(e.target.value)}
        />

        <div className="mt-4 flex-row">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={`${styles.formGroup}`}>
              <label className={`${styles.label} m-2`} htmlFor="product_size">
                PRODUCT SIZE
              </label>
              <div className={styles.sizeselect}>
                <div className={`${styles.sizeButtons}`}>
                  <div>
                    <h3 className="m-1">Total Quantity:</h3>
                  </div>
                  <div>
                    {sizeSelected[
                      !productInfo.selectedSubcategory
                        ? "Shirts"
                        : productInfo.selectedSubcategory
                    ].map((size, index) => (
                      <div
                        key={index}
                        className={styles.sizeContainer}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <div
                          style={{
                            width: "200px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <h5 className={styles.blue}>{size}</h5>
                        </div>

                        <div>
                          <input
                            type="number"
                            name={size}
                            onChange={(e) =>
                              setQtyAndSizes((prev) => {
                                return {
                                  ...prev,
                                  [e.target.name]: Number(e.target.value),
                                };
                              })
                            }
                            className={styles.quantityInput}
                            style={{
                              border: "1px solid #DDDDDD",
                              display: "flex",
                              flexDirection: "row",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {productDetails.length !==0 ?<div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            height: "50px",
          }}
        >
          {productDetails?.map((ele, index) => (
            <div
              style={{
                background: `${ele.color}`,
                width: "50px",
                height: "50px",
                gap: "10px",
                textAlign: "center",
                lineHeight: "75px",
                fontSize: "30px",
                margin: "left -10px",
              }}
              onClick={() => 
                {setIndex(index);
                  console.log(index)
                }}
            ></div>
          ))}
        </div> : null}
      </div>

      {/* {productDetails.length !==0 ? ( */}
        <div className="bg-white mt-3 p-1">
          <div style={{ marginTop: "30px" }}>
            <h3 className="m-1 fw-bold">Product image</h3>
            <br />
            <div className="flex items-start justify-start">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-50 h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Image 1 </span> click here
                    to upload
                  </p>
                  <img
                    style={{ height: "200px", width: "40%" }}
                    src={img1}
                    alt=""
                  />
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

              <div className="image-previews flex flex-row">
                <div className="image-preview">
                  <div className="image-preview">
                    <img
                      src={imagePreviews[0]}
                      alt="imge 1"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        margin: "10px",
                      }}
                    />
                  </div>

                  <button
                    className="text-center"
                    onClick={() => {
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
            <div className="flex items-start justify-start">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-50 h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Image 2</span> click here to
                    upload
                  </p>

                  <img
                    style={{ height: "200px", width: "40%" }}
                    src={img2}
                    alt=""
                  />
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
              <div className="image-previews flex flex-row">
                <div className="image-preview">
                  <div className="image-preview">
                    <img
                      src={imagePreviews[1]}
                      alt="imge 2"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        margin: "10px",
                      }}
                    />
                  </div>

                  <button
                    className="text-center"
                    onClick={() => {
                      const updatedImages = [...images];
                      updatedImages.splice(1, 2);
                      setImages(updatedImages);

                      const updatedPreviews = [...imagePreviews];
                      updatedPreviews.splice(1, 2);
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
            <div className="flex items-start justify-start">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-50 h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Upload </span> 4th image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  <img
                    style={{ height: "200px", width: "40%" }}
                    src={img3}
                    alt=""
                  />
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
              <div className="image-previews flex flex-row">
                <div className="image-preview">
                  <div className="image-preview">
                    <img
                      src={imagePreviews[2]}
                      alt="imge 3"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        margin: "10px",
                      }}
                    />
                  </div>

                  <button
                    className="text-center"
                    onClick={() => {
                      const updatedImages = [...images];
                      updatedImages.splice(2, 3);
                      setImages(updatedImages);

                      const updatedPreviews = [...imagePreviews];
                      updatedPreviews.splice(2, 3);
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
            <div className="flex items-start justify-start">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-50 h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    <span className="font-semibold">Upload </span> 4th image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                  <img
                    style={{ height: "200px", width: "40%" }}
                    src={img4}
                    alt=""
                  />
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
              <div className="image-previews flex flex-row">
                <div className="image-preview">
                  <div className="image-preview">
                    <img
                      src={imagePreviews[3]}
                      alt="imge 4"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        margin: "10px",
                      }}
                    />
                  </div>

                  <button
                    className="text-center"
                    onClick={() => {
                      const updatedImages = [...images];
                      updatedImages.splice(3, 4);
                      setImages(updatedImages);

                      const updatedPreviews = [...imagePreviews];
                      updatedPreviews.splice(3, 4);
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
          </div>
        </div>
      {/* ) : ( */}
        <div>
          {/* <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} /> */}
        </div>
      {/* )} */}
      <div className="m-2 d-flex justify-center items-center">
        {loader ? (
          <button
            onClick={submitHandler}
            style={{ background: "#4BB543" }}
            className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
          >
            Submit
          </button>
        ) : (
          <button
            style={{ background: "white" }}
            className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm flex font-medium text-white border-1"
          >
            <Watch width="200" color="red" />
          </button>
        )}

        {/* <button
          onClick={() => navigate(-1)}
          className="bg-emerald-400 py-2.5 px-5 w-75 mr-2 mb-2 rounded-none text-sm font-medium text-white"
        >
          Back
        </button> */}
        {/* <button
          onClick={() => setSecondModal(false)}
          className="btn btn-danger py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white rounded-none border-gray-200"
        >
          Cancel
        </button> */}
      </div>
    </div>
  );
}

export default Section2;
