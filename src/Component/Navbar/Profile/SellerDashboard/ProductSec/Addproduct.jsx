import React, { useEffect } from "react";
import styles from "./Addproduct.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import httpService from "../../../../Error Handling/httpService";
import { apiURL } from "../../../../../const/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Setion2 from "./Setion2";

function AddProduct() {
  const [isButtonVisible, setButtonVisible] = useState(true);
  const history = useNavigate();

  const categorySizes = {
    Mens: [],
    Womens: [],
    Kids: [],
  };

  const productInfoArray = [
    "Material",
    "Packoff",
    "Closure",
    "Fit",
    "Pattern",
    "Idealfor",
    "Washcare",
    "Convertible",
  ];

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
    ],
    Pants: [
      "Jeans",
      "Chinos",
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
  };

  const sizeSelected = {
    Shirts: ["S", "M", "L", "XL"],
    Pants: [28, 30, 32, 34, 36, 38, 40],
    top: ["XS", "S", "M", "L", "XL"],
    Bottom: ["XS", "S", "M", "L", "XL"],
    Sarees: ["5.5 meters", "6 meters", "6.5 meters", "7 meters", "9 yards"],
    KidsShirt: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    kidspants: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    shorts: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    KidsBaniyans: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
  };

  const [productInfo, setProductInfo] = useState({});
  const [productInfoDet, setProductInfoDet] = useState({});
  const [color, setColor] = useState("");
  const [qtyAndSizes, setQtyAndSizes] = useState({});
  const [prviewProdcts, setprviewProdcts] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const [totalStocks, setTotalStocks] = useState(0);
  const [errors, setErrors] = useState({});
  const [colorError, setColorError] = useState("");
  const [imageError, setimageError] = useState("");
  const [validation, setvalidation] = useState(false);
  const [uplProductId, setUplProductId] = useState("");

  const [secondModal, setSecondModal] = useState(false);

  const [imagesHad, setImagesHad] = useState(null);
  const categoriesWithSubcategories = {
    Mens: ["Shirts", "Pants"],
    Womens: ["top", "Bottom", "Sarees"],
    Kids: ["KidsShirt", "KidsBaniyans", "kidspants", "shorts"],
  };

  const imgHandler = async (e) => {
    const files = e.target.files;
    setImagesHad(files);
  };
  // const imgHandler = async (e) => {
  //   // const files = Array.from(e.target.files);
  //   const files = e.target.files;

  //   const formData = new FormData();
  //   // formData.append("photos", files);

  //   for (const file of files) {
  //     formData.append("photos", file);
  //   }
  //   const response = await fetch(`${apiURL}/product/images`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res)
  //     .then((res) => res.json())
  //     .catch((eer) => eer);

  //   console.log("UPload REsponse", response);
  // };

  const handleDeleteImage = (index) => {
    const updatedImages = [...base64Images];
    updatedImages.splice(index, 1);
    setBase64Images(updatedImages);
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const validateFormcolorandimage = () => {
    let success = true;

    if (!color) {
      setColorError("Color is required");
      success = false;
    } else {
      setColorError("");
    }

    // if (base64Images.length === 0) {
    //   setimageError("Please upload at least one image");
    //   success = false;
    // } else {
    //   setimageError("");
    // }

    return success;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!productInfo.productCode) {
      newErrors.productCode = "Add ProductCode ";
    }
    // if (!productInfo.description) {
    //   newErrors.description = "Add description about the product";
    // }

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

  let totalQuantity = 0;

  useEffect(() => {
    let value =
      Object.values(qtyAndSizes).length > 0 &&
      Object.values(qtyAndSizes).reduce((acc, curr) => acc + curr);
    totalQuantity += value;
  }, [qtyAndSizes]);

  const deleteAnyColor = (ind, prod) => {
    setprviewProdcts((prev) => {
      const newItems = prev.filter((item) => item !== prod);
      return [...newItems];
    });
    toast.success("deleted");
  };

  const addColorsHandler = () => {
    const success = validateFormcolorandimage();
    if (success) {
      setprviewProdcts((prev) => [
        ...prev,
        {
          color,
          images: base64Images,
          qtyAndSizes,
        },
      ]);
      setvalidation(true);
      setBase64Images([]);
      setColor("");
      setTotalStocks((prev) => prev + Number(totalQuantity));
      toast.success("color varient addeded successfully");
    } else {
      toast.warn("please add the image and color and size");
    }
  };

  const addNewProduct = async () => {
    // e.preventDefault();
    const isValid = validateForm();
    setButtonVisible(false);

    console.log("Uploaded imgs", imagesHad);

    // console.log(isValid);
    // if (validation) {
    //   if (isValid) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    // const formData = new FormData();

    // // for (const file of imagesHad) {
    // //   formData.append("images", file);
    // // }
    // formData.append("productInfo", JSON.stringify(productInfoDet));
    // // formData.append("productDetails", JSON.stringify(prviewProdcts));
    // formData.append("genInfo", JSON.stringify(productInfo));
    // formData.append("stock", totalStocks);

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
            title: "The product successfully added",
            showConfirmButton: false,
            timer: 1000,
          });
          setButtonVisible(true);
        });
      // history("/dashboard");
    } catch (error) {
      console.log("Couldn't add product: ", error);
      setButtonVisible(true);
    }
    //   } else {
    //     Swal.fire("Fill the all fields", "All field should be filled", "error");
    //   }
    // } else {
    //   Swal.fire("Fill the all fields", "All field should be filled", "error");
    // }
  };

  return (
    <div className="bg-gray">
      {/* <div className={styles.headingdiv}>
        <h2 className={styles.headingText}>Add product </h2>
      </div> */}

      {secondModal ? (
        <Setion2
          productId={uplProductId}
          sizeSelected={sizeSelected}
          productInfo={productInfo}
          setSecondModal={setSecondModal}
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
                      // maxlength="50"
                      className="block w-full text-sm text-gray-800 border-1  focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write product description here"
                      required
                      name="description"
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
                onChange={(e) => onchangeHandler(e)}
                rows="4"
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

              {productInfoArray.map((ele) => (
                <div className="mt-3" key={ele}>
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {ele}
                  </label>
                  {/* {errors[`${ele}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`${ele}`]}
                </p>
              )} */}
                  <input
                    type="text"
                    id="title"
                    className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter ${ele}`}
                    required
                    name={ele}
                    onChange={(e) => InfoHandler(e)}
                  />
                </div>
              ))}
            </div>

            <div className="bg-white mt-4">
              {/* <div style={{ marginLeft: "30px", marginBottom: "20px" }}>
            <label
              for="message"
              className=" m-2 p-2 block mb-2 text-sm font-medium text-gray-900"
            >
              Additional Text
            </label>
            {errors.MoreDetails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.MoreDetails}
              </p>
            )}
            <textarea
              name="MoreDetails"
              onChange={(e) => onchangeHandler(e)}
              rows="4"
              maxLength={"70"}
              className="block p-4 w-full text-sm border-1 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter washcare description of product here..."
            />
          </div> */}

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
                onChange={(e) => onchangeHandler(e)}
                rows="4"
                maxLength={"70"}
                className="block p-4 w-full text-sm border-1"
                placeholder="Enter tages for searching product"
              />
            </div>
          </div>
          <div className="m-2 d-flex justify-center items-center">
            <button
              onClick={addNewProduct}
              style={{ background: "#4BB543" }}
              className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
            >
              Submit
            </button>
            <button
              // onClick={addNewProduct}
              // style={{ background: "#" }}
              className="btn btn-danger py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
