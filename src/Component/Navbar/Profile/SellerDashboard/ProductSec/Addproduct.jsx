import React, { useEffect } from "react";
import styles from "./Addproduct.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import httpService from "../../../../Error Handling/httpService";
import { apiURL } from "../../../../../const/config";
import { useNavigate, useParams } from "react-router-dom";
import Section2 from "./Setion2";

function AddProduct() {
  const [isButtonVisible, setButtonVisible] = useState(true);

  const history = useNavigate();

  let { productId } = useParams();

  const categorySizes = {
    Mens: [],
    Womens: [],
    Kids: [],
  };

  const productCategories = Object.keys(categorySizes);

  const Collections = {
    Shirts: [
      "Dress Shirts",
      "T-Shirts",
      "Polo Shirts",
      "Casual Button-Up Shirts",
      "Flannel Shirts",
      "Henley Shirts",
      "Sweatshirts",
      "Hoodies",
      "Formal Shirts",
    ],
    Pants: [
      "Jeans",
      "Chinos",
      "Formal Pants",
      "Dress Pants",
      "Cargo Pants",
      "Sweatpants",
      "Joggers",
      "Track Pants",
      "Corduroy Pants",
    ],
    top: [
      "Blouses",
      "T-Shirts",
      "Tank Tops",
      "Crop Tops",
      "Sweaters",
      "Cardigans",
      "Hoodies",
      "Peplum Tops",
      "Tunics",
      "Button-Up Shirts",
      "Bodysuits",
      "Off-the-Shoulder Tops",
      "Wrap Tops",
      "Tube Tops",
      "Kimono Tops",
      "Polo Shirts",
      "Camisoles",
      "Cold Shoulder Tops",
      "Cowl Neck Tops",
      "Ruffle Tops",
    ],
    Bottom: [
      "Jeans",
      "Leggings",
      "Trousers",
      "Skirts",
      "Shorts",
      "Culottes",
      "Palazzo Pants",
      "Joggers",
      "Capri Pants",
      "Wide-Leg Pants",
      "Cargo Pants",
      "Pencil Skirts",
      "A-line Skirts",
      "Maxi Skirts",
      "Mini Skirts",
      "Flared Skirts",
      "Denim Skirts",
      "Pleated Skirts",
      "High-Waisted Pants",
      "Harem Pants",
    ],
    Sarees: [
      "Silk Sarees",
      "Cotton Sarees",
      "Chiffon Sarees",
      "Georgette Sarees",
      "Banarasi Sarees",
      "Kanjivaram Sarees",
      "Designer Sarees",
      "Bridal Sarees",
      "Linen Sarees",
      "Printed Sarees",
      "Net Sarees",
      "Half-and-Half Sarees",
      "Satin Sarees",
      "Embroidered Sarees",
      "Saree with Blouse Sets",
      "Traditional Sarees",
      "Bollywood Sarees",
      "Party Wear Sarees",
      "Casual Sarees",
      "Lehenga Sarees",
    ],
    KidsShirt: [
      "T-Shirts",
      "Polo Shirts",
      "Button-Up Shirts",
      "Graphic Tees",
      "Long Sleeve Shirts",
      "Hoodies",
      "Sweatshirts",
      "Tank Tops",
      "Henley Shirts",
      "Flannel Shirts",
      "Sport Jerseys",
      "Printed Shirts",
      "Casual Shirts",
      "Dress Shirts",
      "Chambray Shirts",
      "Uniform Shirts",
      "Ruffle Tops (for girls)",
      "Peplum Tops (for girls)",
      "Bodysuits (for infants)",
    ],

    kidspants: [
      "Jeans",
      "Leggings",
      "Trousers",
      "Shorts",
      "Cargo Pants",
      "Sweatpants",
      "Joggers",
      "Track Pants",
      "Corduroy Pants",
      "Khaki Pants",
      "Chinos",
      "Capri Pants",
      "Denim Pants",
      "Athletic Pants",
      "Overalls",
      "School Uniform Pants",
      "Printed Pants",
      "Convertible Pants (with zip-off legs)",
      "Dress Pants",
      "Stretch Pants",
    ],
    shorts: [
      "Denim Shorts",
      "Athletic Shorts",
      "Cargo Shorts",
      "Bermuda Shorts",
      "Chino Shorts",
      "Board Shorts",
      "Cotton Shorts",
      "Khaki Shorts",
      "Printed Shorts",
      "Linen Shorts",
      "Track Shorts",
      "Pull-On Shorts",
      "School Uniform Shorts",
      "Sweat Shorts",
      "Jogger Shorts",
      "Running Shorts",
      "Basketball Shorts",
      "Active Shorts",
      "Pleated Shorts",
      "Swim Shorts",
    ],
    GirlsShirts: [
      "T-Shirts",
      "Blouses",
      "Tank Tops",
      "Polo Shirts",
      "Button-Up Shirts",
      "Sweaters",
      "Hoodies",
      "Long Sleeve Shirts",
      "Crop Tops",
      "Graphic Tees",
    ],
    GirlsPants: [
      "Jeans",
      "Leggings",
      "Trousers",
      "Yoga Pants",
      "Culottes",
      "Jeggings",
      "Cargo Pants",
      "Sweatpants",
      "Capri Pants",
      "Palazzo Pants",
    ],

    GirlsShorts: [
      "Denim Shorts",
      "Athletic Shorts",
      "Cargo Shorts",
      "Bermuda Shorts",
      "Chino Shorts",
      "Board Shorts",
      "Cotton Shorts",
      "Khaki Shorts",
      "Printed Shorts",
      "Linen Shorts",
      "Track Shorts",
      "Pull-On Shorts",
      "School Uniform Shorts",
      "Sweat Shorts",
      "Jogger Shorts",
      "Running Shorts",
      "Basketball Shorts",
      "Active Shorts",
      "Pleated Shorts",
      "Swim Shorts",
    ],

    Frock: [
      "A-Line Frocks",
      "Party Frocks",
      "Casual Frocks",
      "Maxi Frocks",
      "Pinafore Frocks",
      "Sundresses",
      "Floral Frocks",
      "Ruffle Frocks",
      "Smocked Frocks",
      "Tiered Frocks",
    ],
    KidsBaniyans: [
      "Cotton Baniyans",
      "Sleeveless Baniyans",
      "Patterned Baniyans",
      "Sports Baniyans",
      "Printed Baniyans",
      "Vest-Style Baniyans",
      "Crew-Neck Baniyans",
      "Ribbed Baniyans",
      "Colored Baniyans",
      "Tank Top Baniyans",
    ],
  };

  const sizeSelected = {
    Shirts: ["S", "M", "L", "XL", "XXL","XXXL"],
    Pants: [28, 30, 32, 34, 36, 38, 40,42],
    top: ["XS", "S", "M", "L", "XL","XXL","XXXL"],
    Bottom: ["XS", "S", "M", "L", "XL","XXL","XXXL"],
    Sarees: ["5.5 meters", "6 meters", "6.5 meters", "7 meters", "9 yards"],
    KidsShirt: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    kidspants: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    shorts: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    KidsBaniyans: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    GirlsShirts: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL","XXL","XXXL"],
    GirlsPants: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL","XXL","XXXL"],
    GirlsShorts: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL","XXL","XXXL"],
    Frock: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL","XXL","XXXL"],
  };

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
  const [secondModal, setSecondModal] = useState(false);

  const categoriesWithSubcategories = {
    Mens: ["Shirts", "Pants"],
    Womens: ["top", "Bottom", "Sarees"],
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
    setButtonVisible(false);

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
          setButtonVisible(true);
        });
    } catch (error) {
      console.log("Couldn't add product: ", error);
      setButtonVisible(true);
    }
  };

  const getProductForEdit = async () => {
    try {
      await httpService
        .get(`${apiURL}/product/get-single-products/${productId}`)
        .then((res) => {
          console.log("Res", res);

          const { productInfo,_id, ...others } = res.data;
          setProductInfoDet((prev) => {
            return { ...productInfo };
          });
          setProductInfo((prev) => {
            return { ...others };
          });
          productId = _id
          console.log(_id)
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

            console.log("productDetails",productDetails)
            setProductDetails(productDetails)
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
    <div className="bg-gray">
      {secondModal ? (
        <Section2
          productId={uplProductId}
          sizeSelected={sizeSelected}
          productInfo={productInfo}
          setSecondModal={setSecondModal}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      ) : (
        <div className={styles.maindiv}>
          <div className={styles.mainone}>
            <div className="bg-white p-1">
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
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
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
                  <p className="text-red-500 text-sm mt-1">{errors.material}</p>
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

            {/* General Info */}

            <div className="mt-4 w-full" style={{ background: "white" }}>
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
                  value={productInfo.selectedCategory}
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
              {productInfo.selectedCategory && (
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
                    value={productInfo.selectedSubcategory}
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a subcategory</option>
                    {categoriesWithSubcategories[
                      productInfo.selectedCategory
                    ].map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {productInfo.selectedSubcategory && (
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
                    value={productInfo.collections}
                    onChange={(e) => onchangeHandler(e)}
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a Collections</option>
                    {Collections[productInfo.selectedSubcategory].map(
                      (collections, index) => (
                        <option key={index} value={collections}>
                          {collections}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

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
                      className="block w-full text-sm text-gray-800 border-1  focus:ring-0 dark:text-white dark:placeholder-gray-400"
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
            <br />
            {/* Color removed */}
            <div style={{ marginBottom: "20px", background: "white" }}>
              <label
                for="message"
                className=" m-2 p-2 block mb-2 text-sm font-medium text-gray-900"
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
                className="block p-4 w-full text-sm border-1 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter washcare description of product here..."
              />
            </div>
          </div>

          <br />

          <div className={`${styles.maintwo} m-2 p-1`}>
            <div className="bg-white p-2">
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

            <div className="bg-white mt-4">
              <label
                for="message"
                className=" m-2 p-2 block mb-2 text-sm font-medium text-gray-900"
              >
                Tags
              </label>
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
              )}
              <textarea
                name="tags"
                value={productInfo.tags}
                onChange={(e) => onchangeHandler(e)}
                rows="4"
                maxLength={"70"}
                required
                className="block p-4 w-full text-sm border-1"
                placeholder="Enter tages for searching product"
              />
            </div>
          </div>
          <div className="m-2 d-flex justify-center items-center">
            <button
              onClick={productId ? updateUproduct : addNewProduct}
              style={{ background: "#4BB543" }}
              className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
            >
              {productId ? "Save and next" : "Submit"}
            </button>
            <button className="btn btn-danger py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
