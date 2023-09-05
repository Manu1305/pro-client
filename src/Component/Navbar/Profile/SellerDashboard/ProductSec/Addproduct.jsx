
import React, { useEffect } from "react";
import styles from "./Addproduct.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import httpService from "../../../../Error Handling/httpService";
import { apiURL } from "../../../../../const/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const history = useNavigate();

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
    Shirts: ["S", "M", "L", "XL", "XXL"],
    Pants: [28, 30, 32, 34, 36, 38, 40],
    top: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
    Bottom: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL"],
    Sarees: ["5.5 meters", "6 meters", "6.5 meters", "7 meters", "9 yards"],
    KidsShirt: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    kidspants: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
    shorts: ["2T", "3T", "4T", "XS", "S", "M", "L", "XL"],
  };

  const [productInfo, setProductInfo] = useState({});
  const [color, setColor] = useState("");
  const [qtyAndSizes, setQtyAndSizes] = useState({});
  const [prviewProdcts, setprviewProdcts] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

  const categoriesWithSubcategories = {
    Men: ["Shirts", "Pants"],
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

  useEffect(() => {
    console.log("ProductInfo", productInfo);
  }, [productInfo]);

  const convertToBase64 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Images((prev) => [reader.result, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    const isValid = true;

    if (isValid) {
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
            { ...productInfo, productDetails: prviewProdcts },
            config
          )
          .then((res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'The product successfully added',
              showConfirmButton: false,
              timer: 1500
            })
            
          });
      } catch (error) {
        console.log("Couldn't add product: ", error);
      }
    } else {
      Swal.fire("Fill the all fields", "All field should be filled", "error");
    }
    history("/dashboard");
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addColorsHandler = () => {
    setprviewProdcts((prev) => [
      ...prev,
      {
        color,
        images: base64Images,
        qtyAndSizes,
      },
    ]);
    console.log(productInfo);
    setBase64Images([]);
  };

  useEffect(() => {
    console.log("prview", prviewProdcts);
  }, [prviewProdcts]);
  return (
    <div>
      <div className={styles.headingdiv}>
        <h2 className={styles.headingText}>Add product </h2>
      </div>
      <div className={styles.maindiv}>
        <div className={styles.mainone}>
          <div className="bg-white">
            <div>
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Id
              </label>
              <input
                type="text"
                id="title"
                name="productId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter product title"
                required
                onChange={(e) => onchangeHandler(e)}
              />
            </div>

            <form style={{ marginTop: "10px" }}>
              <label htmlFor="editor"> product description</label>
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div className="flex flex-wrap items-center space-x-1 sm:pl-4">
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 21 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                          />
                        </svg>
                        <span className="sr-only">Add list</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                        </svg>
                        <span className="sr-only">Settings</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                          <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                        </svg>
                        <span className="sr-only">Timeline</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                          <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Download</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-tooltip-target="tooltip-fullscreen"
                    className="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 19 19"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                      />
                    </svg>
                    <span className="sr-only">Full screen</span>
                  </button>
                  <div
                    id="tooltip-fullscreen"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    Show full screen
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </div>

                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                  <textarea
                    id="editor"
                    rows="8"
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write product description here"
                    required
                    name="description"
                    onChange={(e) => onchangeHandler(e)}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          <div></div>
          <div className="bg-white">
            <h3>General info</h3>
            <div className="mt-3">
              <label
                for="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Meterial
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter material"
                required
                name="material"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>

            <div className="mt-3">
              <label
                for="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Selling price"
                required
                name="sellingPrice"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </div>
          <div>
            <label
              for="color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Colors
            </label>

            <input
              style={{ height: "50px", width: "300px" }}
              type="color"
              id="color"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              name="color"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="mt-4 flex-row">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className={`${styles.formGroup}`}>
                <label className={styles.label} htmlFor="product_size">
                  PRODUCT SIZE
                </label>
                <div className={styles.sizeselect}>
                  <div className={`${styles.sizeButtons}`}>
                    <div>
                      <h3>
                        Total Quantity:
                        {/* {totalQuantity} */}
                      </h3>
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
                              // placeholder="Enter quantity"
                              // value={quantities[size]}
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
              {/* )} */}
            </div>
          </div>

          {/* {primaryColor && ( */}
          <div>
            <div style={{ marginTop: "30px" }}>
              <h3>Product image</h3>
              <br />
              <h4>Add the product main image</h4>
              <div className="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    className="hidden"
                    onChange={handlefirstImg}
                    accept="image/*"
                    multiple
                  />
                </label>
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h3>Add additional product image </h3>
              <br />

              <div className="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    accept="image/*"
                    className="hidden"
                    onChange={convertToBase64}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* )} */}

          <div className="flex justify-center items-center">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-500"
              onClick={addColorsHandler}
            >
              Add color variant
            </button>
          </div>
        </div>

        <div className={styles.maintwo}>
          <div style={{ width: "300px", marginLeft: "40px" }}>
            <label
              for="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select product category
            </label>
            <select
              id="product_category"
              name="selectedCategory"
              onChange={(e) => onchangeHandler(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a category</option>
              {productCategories.map((category, index) => {
                // console.log("Cat",category)
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          {productInfo.selectedCategory && (
            <div style={{ width: "300px", marginLeft: "40px" }}>
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select product Subcategory
              </label>
              <select
                id="category"
                name="selectedSubcategory"
                onChange={(e) => onchangeHandler(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a subcategory</option>
                {categoriesWithSubcategories[productInfo.selectedCategory].map(
                  (subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
          {productInfo.selectedSubcategory && (
            <div style={{ width: "300px", marginLeft: "40px" }}>
              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select collection
              </label>
              <select
                id="subcategory"
                name="selectedCollections"
                onChange={(e) => onchangeHandler(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a Collections</option>
                {Collections[productInfo.selectedSubcategory].map(
                  (selectedCollections, index) => (
                    <option key={index} value={selectedCollections}>
                      {selectedCollections}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <div style={{ marginLeft: "30px" }}>
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Washcare information
            </label>
            <textarea
              name="WashcareInstructions"
              onChange={(e) => onchangeHandler(e)}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter washcare description of product here..."
            ></textarea>
          </div>

          <h3 style={{ marginLeft: "30px" }}>Product Summary</h3>

          <div
            style={{ marginLeft: "30px" }}
            className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h2>Product category</h2>{" "}
              <h2>
                {prviewProdcts.length >= 0
                  ? productInfo.selectedCategory
                  : "Mens"}
              </h2>{" "}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h2>Product Description</h2>
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
              <h2>{prviewProdcts.length >= 0 ? productInfo.realPrice : 600}</h2>
            </div>
            <div
              style={{ marginLeft: "10px" }}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <div>
                {prviewProdcts.length >= 0 &&
                  prviewProdcts.map((prd) => (
                    <div>
                      <div>Product color code : {prd.color}</div>
                      <div>Qunatity : 45</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={addNewProduct}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-600 rounded-lg border border-gray-200 hover:bg-freen-800 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
