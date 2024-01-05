import React, { useEffect, useState } from "react";

function ProductSizes({
  qtyAndSizes,
  productInfo,
  styles,
  totQut,
  sizeSelected,
  setQtyAndSizes,
  setPrices,
  checkbox,
  // Packoff
}) {
  const priceHandler = (event, index) => {
    const { name, value } = event.target;

    setPrices((prevPrices) => {
      const updatedPrices = [...prevPrices];

      //   if index curent index not found
      if (!updatedPrices[index]) {
        updatedPrices[index] = {};
      }
      updatedPrices[index][name] = parseFloat(value);
      return updatedPrices;
    });
  };

  const Packoff = 1;

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

  useEffect(() => {
    console.log(selectedSizes);
  }, [selectedSizes]);

  return (
    <div>
      {false ? (
        <div className={`${styles.formGroup} p-2`}>
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
                  <h3 className="m-1">Total Quantity:{totQut}</h3>
                </div>
                <div className="flex flex-wrap gap-9 p-8">
                  {sizeSelected[
                    !productInfo.selectedSubcategory
                      ? "Shirts"
                      : productInfo.selectedSubcategory
                  ].map((size, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex justify-center items-center w-[150px] h-10 border-r-zinc-400 indent-2.5 border">
                        {size}
                      </div>
                      <input
                        type="number"
                        name={size}
                        placeholder="Enter quantites"
                        onChange={(e) =>
                          setQtyAndSizes((prev) => {
                            return {
                              ...prev,
                              [e.target.name]: Number(e.target.value),
                            };
                          })
                        }
                        defaultValue={0}
                        value={qtyAndSizes[size] ? qtyAndSizes[size] : ""}
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
            <div className="">
              {checkbox && (
                <>
                  <div className="flex justify-around m-2">
                    <h3>Selling price</h3>
                    <h3>Real price</h3>
                  </div>
                  {sizeSelected[
                    !productInfo.selectedSubcategory
                      ? "Shirts"
                      : productInfo.selectedSubcategory
                  ].map((size, index) => (
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
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-6 px-16 flex gap-4"
          style={{ background: "rgb(247, 251, 255)" }}
        >
          <div className="bg-white shadow-md w-[50%] p-2">
            <span className="text-xl font-bold">Check Pack Sizes</span>
            {/* For Sizes */}
            <div className="flex flex-wrap  justify-between">
              {sizeSelected[
                !productInfo.selectedSubcategory
                  ? "Shirts"
                  : productInfo.selectedSubcategory
              ].map((size, index) => (
                <div
                  key={index}
                  className="flex w-[50%] cursor-pointer items-center gap-4 p-2"
                  onClick={() => handleSizes(size)}
                >
                  <input
                    type="checkbox"
                    className="p-3 w-6 h-6 cursor-pointer"
                    name={size}
                    id={`custom-checkbox-${index}`}
                  />
                  <label
                    htmlFor={`custom-checkbox-${index}`}
                    className="text-[16px] font-medium cursor-pointer"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Enter Avialable sets */}

          <div className="flex flex-col justify-center items-center w-[50%]  bg-white shadow-md">
            <div className="flex flex-col p-2 w-[50%]">
              <span className="text-medium font-bold text-start">
                Enter Available Sets
              </span>
              <input
                type="number"
                className="text-center p-2 border-2 rounded mt-2 border-black"
                placeholder="Enter Availble Sets"
              />
            </div>

            <div className="flex flex-col p-2 w-[50%]">
              <span className="text-medium font-bold text-start">
                Minimum Sets For Placing Order 
              </span>
              <input
                type="number"
                className="text-center p-2 border-2 rounded mt-2 border-black"
                placeholder="Enter Minimum Sets For Placing Order "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSizes;
