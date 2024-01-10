import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sizeSelected } from "../Datas";
import styles from "../Addproduct.module.css";

function ProductSizes() {
  const currentProduct = useSelector(
    (state) => state.addProductReducer.product
  );
  console.log("currentProduct", currentProduct);

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizes = (size) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((selectedItem) => selectedItem !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  // const packOff = currentProduct.productInfo.Packoff  ;
  const packOff = currentProduct.productInfo.Packoff  ;
  // const isKidsProduct = currentProduct.selectedCategory.toLowerCase() === "kids";
  const isKidsProduct = true;

  return (
    <div>
      {packOff === 1 ? (
        <div className={`bg-white p-2`}>
          <label
            className={`${styles.label} m-2 text-2xl fw-bold `}
            htmlFor="product_size"
          >
            Available Sizes
          </label>
          <div className="font-bold flex flex-row justify-between items-center">
            <div className="">
              <div className={`${styles.sizeButtons}`}>
                <div>
                  <h3 className="m-1">Total Quantity:{"totQut"}</h3>
                </div>
                <div className="flex flex-wrap gap-9 p-8">
                  {sizeSelected["Shirts"].map((size, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex justify-center items-center w-[150px] h-10 border-r-zinc-400 indent-2.5 border">
                        {size}
                      </div>
                      <input
                        type="number"
                        name={size}
                        placeholder="Enter quantites"
                        defaultValue={0}
                        className="h-[40px] w-[150px] p-1"
                        style={{
                          border: "1px solid #DDDDDD",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="">
              {true && (
                <>
                  <div className="flex justify-around m-2">
                    <h3>Selling price</h3>
                    <h3>Real price</h3>
                  </div>
                  {sizeSelected["Shirts"].map((size, index) => (
                    <div className="flex flex-row gap-3">
                      <input
                        className="p-2 border-2 m-1"
                        type="number"
                        name="sellingPrice"
                        placeholder="Enter Selling Price"
                        onChange={(event) => priceHandler(event, index)}
                      />

                      <input
                        className="p-2 border-2 m-1"
                        type="number"
                        name="realPrice"
                        placeholder="Enter Real Price"
                        onChange={(event) => priceHandler(event, index)}
                      />
                    </div>
                  ))}
                </>
              )}
            </div> */}
          </div>
        </div>
      ) : (
        // F
        <div
          className="p-6 px-16 flex gap-4"
          style={{ background: "rgb(247, 251, 255)" }}
        >
          <div className="bg-white shadow-md w-[50%] p-2">
            <span className="text-xl font-bold">Check Pack Sizes</span>
            {/* For Sizes */}
            <div className="flex flex-wrap  justify-between">
              {sizeSelected["Shirts"].map((size, index) => (
                <div
                  key={index}
                  className="flex w-[50%] "
                  onClick={() => handleSizes(size)}
                >
                  {/* Sizes  */}
                  <div className="flex cursor-pointer items-center gap-4 p-2">
                    {!isKidsProduct && (
                      <input
                        type="checkbox"
                        className="p-3 w-6 h-6 cursor-pointer"
                        name={size}
                        id={`custom-checkbox-${index}`}
                      />
                    )}
                    <label
                      htmlFor={`custom-checkbox-${index}`}
                      className="text-[16px] w-20 h-8 font-medium cursor-pointer"
                    >
                      {size}
                    </label>
                    {isKidsProduct && (
                      <input
                        autoFocus={index === 0}
                        className="w-[50%] p-2 border-1 rounded border-black"
                        type="text"
                        placeholder="Enter Prices"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Enter Avialable sets */}

          <div className="flex flex-col px-4 w-[50%]  bg-white shadow-md">
            <div className="flex flex-col p-2 w-[50%]">
              <span className="text-medium font-bold text-start">
                Enter Available Sets
              </span>
              <input
                type="number"
                className="p-2 border-2 rounded mt-2 border-black"
                placeholder="Enter Availble Sets"
              />
            </div>

            <div className="flex flex-col p-2">
              <span className="text-medium font-bold text-start">
                Minimum Sets For Placing Order
              </span>
              <input
                type="number"
                className="p-2 border-2 rounded mt-2 w-[50%] border-black"
                placeholder="Enter Minimum Sets"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSizes;
