import React, { useEffect } from "react";
import styles from "./Addproduct.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Section2 from "./Setion2";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import { Collections, sizeSelected } from "./Datas";

function AddProduct() {
  let { productId } = useParams();
  const navigate = useNavigate();

  const categorySizes = {
    Mens: [],
    Womens: [],
    Kids: [],
  };

  const productCategories = Object.keys(categorySizes);

  const [productInfo, setProductInfo] = useState({
    title: "",
    productCode: "",
    brand: "",
    realPrice: "",
    sellingPrice: "",
    selectedCategory: "",
    selectedSubcategory: "",
    collections: "",
    description: "",
    MoreDetails: "",
    tags: "",
  });
  const [productInfoDet, setProductInfoDet] = useState({
    Material: "",
    Packoff: "",
    Fit: "",
    Pattern: "",
    Idealfor: "",
    Washcare: "",
    Closure: "",
    Convertible: "",
  });

  const [errors, setErrors] = useState({});
  const [uplProductId, setUplProductId] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [secondModal, setSecondModal] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const categoriesWithSubcategories = {
    Mens: ["Shirts", "Pants"],
    Womens: ["top", "Bottom", "Sarees", "Kurtis"],
    Kids: [
      "KidsShirt",
      "KidsBaniyans",
      "kidspants",
      "shorts",
      "GirlsShirts",
      "GirlsPants",
      "GirlsShorts",
      "Frock",
    ],
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productInfo.productCode) {
      newErrors.productCode = "Add ProductCode ";
    }

    if (!productInfo.Material) {
      newErrors.material = "Material name is required";
    }

    if (!productInfo.brand) {
      newErrors.brand = "Brand name is required";
    }
    if (!productInfo.realPrice) {
      newErrors.realPrice = "Product real price required";
    }
    if (!productInfo.sellingPrice) {
      newErrors.sellingPrice = "sellingPrice is required";
    }
    if (!productInfo.selectedCategory) {
      newErrors.selectedCategory = "Please select a category";
    }
    if (!productInfo.selectedSubcategory) {
      newErrors.selectedSubcategory = "Please select subcategroy";
    }
    if (!productInfo.selectedSubcategory) {
      newErrors.selectedSubcategory = "Please select subcategroy";
    } else if (!productInfo.collections) {
      newErrors.collections = "Please add collection name of your product";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const InfoHandler = (e) => {
    const { name, value } = e.target;
    setProductInfoDet((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addNewProduct = async () => {
    // e.preventDefault();
    const isValid = validateForm();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      await httpService
        .post(
          `${apiURL}/product/add-new-product`,
          { productInfo: productInfoDet, genInfo: productInfo },
          config
        )
        .then((res) => {
          setSecondModal(true);
          setUplProductId(res.data._id);
          console.log("PRODUCT RESPONSE", res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Saved",
            showConfirmButton: false,
            timer: 1000,
          });
        });
    } catch (error) {
      console.log("Couldn't add product: ", error);
    }
  };

  const getProductForEdit = async () => {
    try {
      await httpService
        .get(`${apiURL}/product/get-single-products/${productId}`)
        .then((res) => {
          console.log("Res", res);

          const { productInfo, _id, ...others } = res.data;
          setProductInfoDet((prev) => {
            return { ...productInfo };
          });
          setProductInfo((prev) => {
            return { ...others };
          });
          productId = _id;
          console.log(_id);
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Saved",
            showConfirmButton: false,
            timer: 1000,
          });
        });
    } catch (error) {
      alert("Error", JSON.stringify(error));
    }
  };

  const updateUproduct = async () => {
    try {
      await httpService
        .put(`${apiURL}/product/update-seller-product/${productId}`, {
          productInfo: productInfoDet,
          generalDetails: productInfo,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Saved",
              showConfirmButton: false,
              timer: 1000,
            });
            setUplProductId(res.data.ack._id);
            const { productInfo, productDetails, ...others } = res.data.ack;
            setProductInfoDet((prev) => {
              return { ...productInfo };
            });
            setProductInfo((prev) => {
              return { ...others };
            });

            console.log("productDetails", productDetails);
            setProductDetails(productDetails);
            setSecondModal(true);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productId && getProductForEdit();
  }, []);


  return (
    <div style={{ background: "rgb(247, 251, 255)" }}>
      {secondModal ? (
        <Section2
          checkbox={checkbox}
          productId={uplProductId}
          sizeSelected={sizeSelected}
          productInfo={productInfo}
          setSecondModal={setSecondModal}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          Packoff={productInfoDet.Packoff}
        />
      ) : (
        <>
          <div className="flex flex-row gap-4 p-3">
            <div className="flex flex-col gap-4 w-[50%]">
              <div className="bg-white p-3 shadow-md">
                <div>
                  <label
                    for="title"
                    className="m-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className=" border-1  border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter product title"
                    required
                    value={productInfo.title}
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                <div>
                  <label
                    for="title"
                    className="m-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Code
                  </label>
                  {errors.productCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productCode}
                    </p>
                  )}
                  <input
                    type="text"
                    id="title"
                    name="productCode"
                    className=" border-1  border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter product code"
                    value={productInfo.productCode}
                    required
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {errors.brand && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.brand}
                      </p>
                    )}
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Brand name"
                    name="brand"
                    value={productInfo.brand}
                    onChange={(e) => onchangeHandler(e)}
                    required
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Orginal price
                  </label>
                  {errors.realPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.realPrice}
                    </p>
                  )}
                  <input
                    type="number"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter price"
                    name="realPrice"
                    value={productInfo.realPrice}
                    onChange={(e) => onchangeHandler(e)}
                    required
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="selling"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Selling price
                  </label>
                  {errors.sellingPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.material}
                    </p>
                  )}
                  <input
                    type="number"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Selling price"
                    required
                    name="sellingPrice"
                    value={productInfo.sellingPrice}
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
              </div>

              <div className="mt-4 w-full p-3 shadow-md bg-white">
                <div className="m-2 w-97">
                  <label
                    for="countries"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {errors.selectedCategory && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.selectedCategory}
                      </p>
                    )}
                    Select product category
                  </label>
                  <select
                    id="product_category"
                    name="selectedCategory"
                    value={productInfo?.selectedCategory}
                    onChange={(e) => onchangeHandler(e)}
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a category</option>
                    {productCategories.map((category, index) => {
                      return (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* {productInfo.selectedCategory && ( */}
                <div className="m-2 w-97">
                  <label
                    for="countries"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select product Subcategory
                  </label>
                  {errors.selectedSubcategory && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.selectedSubcategory}
                    </p>
                  )}
                  <select
                    id="category"
                    name="selectedSubcategory"
                    onChange={(e) => onchangeHandler(e)}
                    value={productInfo?.selectedSubcategory}
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a subcategory</option>
                    {categoriesWithSubcategories[
                      productInfo.selectedCategory === ""
                        ? "Mens"
                        : productInfo.selectedCategory
                    ].map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="m-2 w-97">
                  <label
                    for="countries"
                    className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select collection
                  </label>
                  {errors.collections && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.collections}
                    </p>
                  )}
                  <select
                    id="subcategory"
                    name="collections"
                    value={productInfo?.collections}
                    onChange={(e) => onchangeHandler(e)}
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a Collections</option>
                    {Collections[
                      productInfo.selectedSubcategory === ""
                        ? "Shirts"
                        : productInfo.selectedSubcategory
                    ].map((collections, index) => (
                      <option key={index} value={collections}>
                        {collections}
                      </option>
                    ))}
                  </select>
                </div>
                {/* )} */}

                <form style={{ marginTop: "10px" }}>
                  <label
                    htmlFor="editor"
                    className="m-1 text-sm font-medium text-gray-900"
                  >
                    Product description
                  </label>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                  <div className="w-full mb-4 p-2 dark:bg-gray-700 dark:border-gray-600">
                    <div className="rounded-b-lg ">
                      <textarea
                        id="editor"
                        rows="8"
                        className="block w-full text-sm text-gray-800 border-1 p-2  focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Write product description here"
                        required
                        name="description"
                        value={productInfo.description}
                        onChange={(e) => onchangeHandler(e)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-white mb-4 h-[230px] shadow-md p-3">
                <label
                  for="message"
                  className=" m-2 p-2 block mb-2 text-sm font-medium text-gray-900 text-[20px]"
                >
                  Additional Text
                </label>
                {errors["Additional Text"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["Additional Text"]}
                  </p>
                )}
                <textarea
                  name="MoreDetails"
                  value={productInfo.MoreDetails}
                  onChange={(e) => onchangeHandler(e)}
                  rows="4"
                  required
                  maxLength={"70"}
                  className="block p-2 w-full text-sm border-1 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter washcare description of product here..."
                />
              </div>
            </div>

            {/* General Info */}
            <div className={`${styles.maintwo} p-3 `}>
              <div className="bg-white p-4">
                <h3 className="fw-bolder">General info</h3>

                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Material
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Material Type`}
                    required
                    name="Material"
                    value={productInfoDet.Material}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pack Off
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Packoff`}
                    required
                    name="Packoff"
                    value={productInfoDet.Packoff}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Closure
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Closure`}
                    required
                    name="Closure"
                    value={productInfoDet.Closure}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fit
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Fit`}
                    required
                    name="Fit"
                    value={productInfoDet.Fit}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pattern
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Pattern`}
                    required
                    name="Pattern"
                    value={productInfoDet.Pattern}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ideal For
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Men or Female`}
                    required
                    name="Idealfor"
                    value={productInfoDet.Idealfor}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Washcare
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter Washcare instructions`}
                    required
                    name="Washcare"
                    value={productInfoDet.Washcare}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Convertible
                  </label>

                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"Enter Yes or No"}
                    required
                    name="Convertible"
                    value={productInfoDet.Convertible}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
              </div>
              <div className="bg-white mt-4 p-3 shadow-md">
                <label
                  for="message"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tags
                </label>

                <textarea
                  name="tags"
                  value={productInfo.tags}
                  onChange={(e) => onchangeHandler(e)}
                  rows="4"
                  maxLength={"70"}
                  required
                  className="block p-2 w-full text-sm border-1"
                  placeholder="Enter keywords or product name to find your product"
                />
              </div>

              <div className="bg-white mt-4 p-4 shadow-md">
                <label
                  for="message"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Additional Information About Product
                </label>

                <div className="flex items-center p-3">
                  <input
                    type="checkbox"
                    name="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setCheckbox(e.target.checked)}
                  />
                  <label
                    for="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Price depends on sizes then ckeck the box
                  </label>
                </div>
                <div className="flex items-center p-3">
                  <input
                    type="checkbox"
                    name="Yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => setCheckbox(e.target.checked)}
                  />
                  <label
                    for="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Setwise
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="m-2 flex flex-row justify-center items-center gap-6">
            <button
              onClick={productId ? updateUproduct : addNewProduct}
              style={{ background: "#4BB543" }}
              className="py-3 px-[5rem] shadow-md text-md font-medium text-white border-1 border-gray-200"
            >
              {productId ? "Save and next" : "Submit"}
            </button>

            <button
              className="bg-red-600 shadow-md py-3 px-[5rem] text-md font-medium text-white border-1 border-gray-200"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AddProduct;
