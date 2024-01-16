import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// sort images
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import Photo from "./components/Photo";
import axios from "axios";
import Colors from "./components/Colors";
import ProductSizes from "./components/ProductSizes";
import { useDispatch, useSelector } from "react-redux";

function ColorAndSizes() {
  const dispatch = useDispatch();

  const updateProductColor = useSelector(state => state.addProductReducer.product)

  // const Packoff = 3
  let { productId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [index, setIndex] = useState(0);

  // const [updateQty, setUpdateQty] = useState(productDetails.length !==0 ? productDetails[index].qtyAndSizes:null)
  const [qtyAndSizes, setQtyAndSizes] = useState({});

  // const updateCondition = productDetails.length !== 0;

  // let photos =
  //   updateCondition &&
  //   productDetails[index].images.map((item) => {
  //     return { src: item };
  //   });
  const [color, setColor] = useState(
    // updateCondition
    //   ? productDetails[0]?.color
    //   : Packoff
      // ? 
      Array(Number(8)).fill("")
      // : []
  );
  const [totQut, setTotQut] = useState(0);
  const [loader, setLoader] = useState(true);
  // const [items, setItems] = useState(photos);
  const [items, setItems] = useState([]);
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

    // const formData = new FormData();
    // for (const file of images) {
    //   formData.append("images", file);
    // }
    // formData.append("qtyAndSizes", JSON.stringify(qtyAndSizes));
    // const colorsArray = typeof color === "string" ? color.split(",") : color;

    // formData.append("color", colorsArray);
    // formData.append("prices", JSON.stringify(prices));

    // console.log("prices", prices);
    try {
      await httpService
        .put(
          `${apiURL}/product/add-product-size-and-quantity/${updateProductColor._id}`,
          // multiColorProduct
          {color,qtyAndSizes},
          config
        )
        .then((res) => {
          console.log("SUCCESS RES", res.data);
          dispatch(res.data)
          // setColor("");
          navigate('/dashboard/add-products/upload-product-images')
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
    setItems([]);
  }, [index]);

  const updateProductColorFunction = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const images = items.map((item) => item.src);

    try {
      await axios
        .put(`${apiURL}/product/update-size-color-images/${updateProductColor._id}`, {
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
      `${apiURL}/product/delete-single-images/${updateProductColor.productInfo._id}`,
      {
        filename,
        index,
      }
    );

    console.log(response);
    // setProductDetails(response.data.ack);
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
    <div className="shadow-md">
      {/* Color */}
      <div className="mt-2 p-2">
        <div className="bg-white p-3">
          <label for="color" className="block m-2 text-2xl">
            Colors
          </label>
          <Colors color={color} setColor={setColor} />
        </div>
      </div>

      {/*Size And Quantities */}
      <div>
        <ProductSizes/>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={false ? updateProductColorFunction : submitHandler}
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

export default ColorAndSizes;
