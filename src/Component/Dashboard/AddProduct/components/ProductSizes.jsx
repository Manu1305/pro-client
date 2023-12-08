import React, { useEffect } from "react";

function ProductSizes({
  qtyAndSizes,
  productInfo,
  styles,
  totQut,
  sizeSelected,
  setQtyAndSizes,
  prices,
  setPrices,
  checkbox,
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


  console.log()
  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={`${styles.formGroup}`}>
          <label
            className={`${styles.label} m-2 text-2xl fw-bold `}
            htmlFor="product_size"
          >
            Product Sizes
          </label>
          <div className="font-bold flex flex-row justify-between items-center">
            <div className="">
              <div className={`${styles.sizeButtons}`}>
                <div>
                  <h3 className="m-1">Total Quantity:{totQut}</h3>
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
                        <h5
                          className="flex flex-row h-10 border-r-zinc-400"
                          style={{
                            width: "300px",
                            textIndent: "10px",
                            borderRadius: "0px",
                            border: "1px solid #dddddd",
                          }}
                        >
                          {size}
                        </h5>
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
                          value={qtyAndSizes[size] ? qtyAndSizes[size] : ""}
                          className={styles.quantityInput}
                          style={{
                            border: "1px solid #DDDDDD",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              {checkbox  && (
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
      </div>
    </div>
  );
}

export default ProductSizes;
