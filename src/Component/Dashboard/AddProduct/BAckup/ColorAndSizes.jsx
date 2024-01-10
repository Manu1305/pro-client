import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import styles from "./Addproduct.module.css";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Watch } from "react-loader-spinner";

// sort images
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "./components/Photo";
import axios from "axios";
import Colors from "./components/Colors";
import UploadImages from "./components/UploadImages";
import ProductSizes from "./components/ProductSizes";

function ColorAndSizes({
  sizeSelected,
  productInfo,
  setSecondModal,
  productId,
  productDetails = [],
  setProductDetails,
  Packoff,
  checkbox,
}) {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [index, setIndex] = useState(0);

  // const [updateQty, setUpdateQty] = useState(productDetails.length !==0 ? productDetails[index].qtyAndSizes:null)
  const [qtyAndSizes, setQtyAndSizes] = useState(
    productDetails.length !== 0 ? productDetails[index].qtyAndSizes : {}
  );

  const updateCondition = productDetails.length !== 0;



  let photos =
    updateCondition &&
    productDetails[index].images.map((item) => {
      return { src: item };
    });
  const [color, setColor] = useState(
    updateCondition   ? productDetails[0]?.color : Packoff ? Array(Number(Packoff)).fill("") : []
  );



  const [totQut, setTotQut] = useState(0);
  const [loader, setLoader] = useState(true);
  const [items, setItems] = useState(photos);
  const [prices, setPrices] = useState([]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
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
    if (images.length > 20) {
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
    const colorsArray = typeof color === "string" ? color.split(",") : color;

    formData.append("color", colorsArray);
    formData.append("prices", JSON.stringify(prices));


    console.log("prices", prices)
    try {
      await httpService
        .put(
          `${apiURL}/product/product_color_images/${productId}`,
          formData,
          config
        )
        .then((res) => {
          console.log("SUCCESS RES", res.data);
          // setColor("");
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

  useEffect(() => {
    // index changes ---- update images
    setItems(photos);
  }, [index]);

  const updateProduct = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const images = items.map((item) => item.src);

    try {
      await axios
        .put(`${apiURL}/product/update-size-color-images/${productId}`, {
          images,
          qtyAndSizes: qtyAndSizes,
          color,
          index,
        })
        .then((res) => {
          console.log("Success", res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Succesfully",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((Err) => {
          console.log(Err);
        });
    } catch (error) {
      console.log("Code Error", error);
    }
  };

  const deleteImages = async (filename) => {
    const response = await axios.post(
      `${apiURL}/product/delete-single-images/${productInfo._id}`,
      {
        filename,
        index,
      }
    );

    console.log(response);
    setProductDetails(response.data.ack);
  };

  const SortablePhoto = SortableElement((item) => <Photo {...item} />);
  const SortableGallery = SortableContainer(({ items }) => (
    <Gallery
      photos={items}
      renderImage={(props) => (
        <div>
          <SortablePhoto {...props} />
          <button
            onClick={() => deleteImages(props.key)}
            className="top-0 bg-red-600 text-white p-2 rounded hover:bg-red-800 m-2"
          >
            <MdDelete />
          </button>
        </div>
      )}
    />
  ));

  return (
    <div className="">
      <div className="mt-2 p-2">
        <div className="bg-white p-3">
          <label for="color" className="block m-2 text-2xl fw-bold bg-white">
            Colors
          </label>
          <Colors Packoff={Packoff} color={color} setColor={setColor} />
        </div>

        <div className="mt-4 flex-row bg-white">
          <ProductSizes
            qtyAndSizes={qtyAndSizes}
            productInfo={productInfo}
            styles={styles}
            totQut={totQut}
            sizeSelected={sizeSelected}
            setQtyAndSizes={setQtyAndSizes}
            checkbox={checkbox}
            style={styles}
            prices={prices}
            setPrices={setPrices}
            Packoff={Packoff}
          />
        </div>
        {updateCondition ? (
          <div
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
                onClick={(e) => {
                  setIndex(index);
                  console.log(ele.color);
                  setColor(ele.color);
                  setQtyAndSizes(productDetails[index].qtyAndSizes);
                }}
              ></div>
            ))}
          </div>
        ) : null}
      </div>

      {productDetails.length === 0 ? (
        <UploadImages
          Packoff={Packoff}
          setImages={setImages}
          setImagePreviews={setImagePreviews}
          imagePreviews={imagePreviews}
          images={images}
          category={productInfo.selectedCategory === "Kids" ? "Kids" :productInfo.selectedSubcategory}
        />
      ) : (
        <div>
          <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
        </div>
      )}
      <div className="m-2 d-flex justify-center items-center">
        {loader ? (
          <>
            <button
              onClick={updateCondition ? updateProduct : submitHandler}
              style={{ background: "#4BB543" }}
              className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
            >
              Submit
            </button>
            <button
              onClick={() => navigate(-1)}
              style={{ background: "#dc2626" }}
              className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white "
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            style={{ background: "white" }}
            className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm flex font-medium text-white border-1"
          >
            <Watch width="200" color="red" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ColorAndSizes;
