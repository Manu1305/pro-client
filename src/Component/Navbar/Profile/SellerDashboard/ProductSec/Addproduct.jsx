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

function AddProduct() {
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

  const categoriesWithSubcategories = {
    Mens: ["Shirts", "Pants"],
    Womens: ["top", "Bottom", "Sarees"],
    Kids: ["KidsShirt", "KidsBaniyans", "kidspants", "shorts"],
  };

  const handlefirstImg = (e) => {
    const files = Array.from(e.target.files);

    // Process each selected file
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    )
      .then((base64Array) => {
        setBase64Images([...base64Images, ...base64Array]);
      })
      .catch((error) =>
        console.error("Error converting image to base64:", error)
      );
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...base64Images];
    updatedImages.splice(index, 1);
    setBase64Images(updatedImages);
  };

  useEffect(() => {
    console.log("ProductInfo", productInfo);
  }, [productInfo]);

  const addNewProduct = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    console.log(isValid)
    // if (validation) {
    //   if (isValid) {
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
              {
                ...productInfo,
                productDetails: prviewProdcts,
                stock: totalStocks,
                productInfo:{...productInfoDet}
              },
              config
            )
            .then((res) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "The product successfully added",
                showConfirmButton: false,
                timer: 1000,
              });
            });
          history("/dashboard");
        } catch (error) {
          console.log("Couldn't add product: ", error);
        }
    //   } else {
    //     Swal.fire("Fill the all fields", "All field should be filled", "error");
    //   }
    // } else {
    //   Swal.fire("Fill the all fields", "All field should be filled", "error");
    // }
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

    if (base64Images.length === 0) {
      setimageError("Please upload at least one image");
      success = false;
    } else {
      setimageError("");
    }

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
    const value =
      Object.values(qtyAndSizes).length > 0 &&
      Object.values(qtyAndSizes).reduce((acc, curr) => acc + curr);
    totalQuantity += value;
  }, [qtyAndSizes]);

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

  useEffect(() => {
    console.log("Stocks", totalStocks);
  }, [totalStocks]);

  console.log("Total Quantity", totalQuantity);

  useEffect(() => {
    console.log("prview", prviewProdcts);
  }, [prviewProdcts]);

  const deleteAnyColor = (ind, prod) => {
    setprviewProdcts((prev) => {
      const newItems = prev.filter((item) => item !== prod);
      return [...newItems];
    });
    alert("delted");
  };

  useEffect(() => {
console.log(productInfoDet)
  },[productInfoDet])

  return (
    <div className="bg-gray">
      <div className={styles.headingdiv}>
        <h2 className={styles.headingText}>Add product </h2>
      </div>
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
                <p className="text-red-500 text-sm mt-1">{errors.realPrice}</p>
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
          <div className="bg-white mt-2 p-2">
            <label
              for="color"
              className="block m-2 text-sm fw-bolder font-medium text-gray-900 dark:text-white"
            >
              Colors
            </label>
            {colorError && (
              <p className="text-red-500 text-sm mt-1">{colorError}</p>
            )}

            <input
              style={{ height: "50px", width: "300px" }}
              type="color"
              id="color"
              className="border-1 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={color}
              name="color"
              onChange={(e) => setColor(e.target.value)}
            />

            <div className="mt-4 flex-row">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={`${styles.formGroup}`}>
                  <label
                    className={`${styles.label} m-2`}
                    htmlFor="product_size"
                  >
                    PRODUCT SIZE
                  </label>
                  <div className={styles.sizeselect}>
                    <div className={`${styles.sizeButtons}`}>
                      <div>
                        <h3 className="m-1">Total Quantity: {totalStocks}</h3>
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
          </div>

          <div className="bg-white mt-3 p-1">
            <div style={{ marginTop: "30px" }}>
              <h3 className="m-1 fw-bold">Product image</h3>
              {imageError && (
                <p className="text-red-500 text-sm mt-1">{imageError}</p>
              )}
              <br />
              <h4>Add the product main image</h4>
              <div className="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden border-0"
                    onChange={handlefirstImg}
                    accept="image/*"
                    multiple
                  />
                </label>
                {base64Images.map((base64Image, index) => (
                  <div>
                    <img
                      key={index}
                      src={base64Image}
                      alt="jius"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        margin: "10px",
                      }}
                    />
                    <button onClick={() => handleDeleteImage(index)}>
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
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center m-2">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-white font-medium bg-red-600"
              onClick={addColorsHandler}
            >
              Add color variant
            </button>
          </div>
        </div>

        <br />

        <div className={`${styles.maintwo} p-1`}>
          <div className="bg-white mt-2 p-2">
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
            <div style={{ marginLeft: "30px", marginBottom: "20px" }}>
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
                rows="8"
                maxLength={"70"}
                className="block p-4 w-full text-sm border-1 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter washcare description of product here..."
              />
            </div>
          </div>

          {/* Prview */}
          <div className="mt-4 w-full bg-white">
            <div>
              <h3
                style={{ marginLeft: "40px", margin: "20px" }}
                className="fw-bolder"
              >
                Product Prview
              </h3>
            </div>
            {/* <div className="d-flex justify-end">
              <Link to={`/viewDetails`}>
                <span className="btn btn-primary btn-sm">View</span>
              </Link>
            </div> */}

            <div
              style={{ marginLeft: "30px" }}
              className="block w-80 text-sm text-gray-900  border-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>Product category</h2>{" "}
                <h2>
                  {prviewProdcts.length >= 0
                    ? productInfo.selectedCategory
                    : "Men"}
                </h2>{" "}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span className="m-2 text-sm font-medium text-gray-900">
                  Product Description
                </span>
                <h2>
                  {prviewProdcts.length >= 0
                    ? productInfo.description
                    : "Puma mens T shirt"}
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>Selling price</h2>
                <h2>
                  {prviewProdcts.length >= 0 ? productInfo.sellingPrice : 600}
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>Real price</h2>
                <h2>
                  {prviewProdcts.length >= 0 ? productInfo.realPrice : 600}
                </h2>
              </div>
              <div
                style={{ marginLeft: "10px" }}
                className="block p-2.5 w-full text-sm text-gray-900"
              >
                {/* <div> */}
                {prviewProdcts.length >= 0 &&
                  prviewProdcts.map((prd, ind) => (
                    <div
                      className="m-2 p-1 border-1 border-gray d-flex column"
                      key={ind}
                    >
                      <div>
                        <div>Product color code : {prd.color}</div>
                        <div>Qunatity : 45</div>
                      </div>
                      <div
                        className="ml-6"
                        onClick={() => deleteAnyColor(ind, prd)}
                      >
                        <DeleteOutlineIcon />
                      </div>
                    </div>
                  ))}
                {/* </div> */}
              </div>
            </div>

            <div className="m-2 flex justify-center items-center">
              <button
                type="button"
                onClick={addNewProduct}
                style={{ background: "#4BB543" }}
                className="py-2.5 px-5 w-75 mr-2 mb-2 text-sm font-medium text-white border-1 border-gray-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
