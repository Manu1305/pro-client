// akashay

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Addproduct.module.css";
import Swal from 'sweetalert2'
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
const initialValues={
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
}
const AddProduct = () => {

  const user = useSelector((state) => state.userReducer.user);
  const history = useNavigate();

  const categorySizes = {
    Men: ["S", "M", "L", "XL"],
    Womens: ["XS", "S", "M", "L"],
    Kids: ["3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years"],
  };

  const categoriesWithSubcategories = {
    Men: ["Casual Shirts", "Formal Shirts",  "T-shirts",
    "Polo shirts",
    "Button-down shirts",
    "Flannel shirts",
    "Henley shirts",
    "Sweatshirts",
    "Hoodies",
    "Tank tops",
    "Long-sleeve shirts",
    "Short-sleeve shirts",
    "Oxford shirts",
    "Chambray shirts",
    "Denim shirts",
    "Plaid shirts",
    "Striped shirts",
    "Printed shirts",
    "Graphic shirts",
    "Sport shirts",
    "Work shirts",
    "Dress shirts"],
    Womens: ["Casual Dresses", "Maxi Dresses", "Pinafore Dresses", "T-shirts",
    "Blouses",
    "Tank tops",
    "Crop tops",
    "Button-down shirts",
    "Tunics",
    "Peplum tops",
    "Off-the-shoulder tops",
    "Wrap tops",
    "Polo shirts",
    "Sweatshirts",
    "Hoodies",
    "Bodysuits",
    "Kimono tops",
    "Cami tops",
    "Bell sleeve tops",
    "Cold shoulder tops",
    "Ruffled tops",
    "Lace tops",
    "Embroidered tops"],
    Kids: ["Cartoon Dresses", "Printed Dresses",  "Casual dresses",
    "Party dresses",
    "Formal dresses",
    "Summer dresses",
    "Maxi dresses",
    "Floral dresses",
    "Tutu dresses",
    "Sundresses",
    "A-line dresses",
    "Pinafore dresses",
    "Smock dresses",
    "Denim dresses",
    "Ruffle dresses",
    "Embroidered dresses",
    "Printed dresses",
    "Princess dresses",
    "Holiday dresses",
    "Special occasion dresses",
    "Birthday dresses",
    "Prom dresses",
    "Christening dresses",
    "Pageant dresses",
    "Wedding dresses",
    "Costume dresses"],
  };
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const productCategories = Object.keys(categorySizes);
  const [productId, setProductId] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantities, setQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [primaryColor, setPrimaryColor] = useState("");
  const [otherColors, setOtherColors] = useState("");
  const [WashcareInstructions, setCareInstructions] = useState("");
  const [material, setMaterial] = useState("");
  const [brand, setbBrand] = useState("");
  const [images, setImages] = useState({});

  const [selectedCategoryError, setSelectedCategoryError] = useState("");
  const [selectedSubcategoryError, setSelectedSubcategoryError] = useState("");
 
  const [productIdError, setProductIdError] = useState("");
  const [realPriceError, setRealPriceError] = useState("");
  const [sellingPriceError, setSellingPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [quantitiesError, setQuantitiesError] = useState({});

  const [primaryColorError, setPrimaryColorError] = useState("");
  const [otherColorsError, setOtherColorsError] = useState("");
  const [WashcareInstructionsError, setCareInstructionsError] = useState("");
  const [materialError, setMaterialError] = useState("");
  const [brandError, setbBrandError] = useState("");


  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleQuantityChange = (size, event) => {
    const { value } = event.target;
    const updatedQuantities = { ...quantities, [size]: value };
    setQuantities(updatedQuantities);

    let sum = 0;
    for (const size in updatedQuantities) {
      sum += Number(updatedQuantities[size]);
    }
    setTotalQuantity(sum);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleRealPriceChange = (e) => {
    setRealPrice(e.target.value);
  };

  const handleSellingPriceChange = (e) => {
    setSellingPrice(e.target.value);
  };

  const convertToBase64 = (event) => {
    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
   
      setImages({ ...images, [event.target.name]: reader.result });
    };
    reader.onerror = (error) => {
      console.log("ERROR", error);
    };
  };

  useEffect(() => {
    
  }, [images]);

  // add product btn
  const addToCart = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    try {
      await httpService
        .post(`${apiURL}/product/add-new-product`, {
          seller: user.email,
          productId,
          brand,
          sellingPrice,
          selectedCategory,
          selectedSizes: [
            selectedSizes[0],
            selectedSizes[1],
            selectedSizes[2],
            selectedSizes[3],
          ],
          images,
          quantities: quantities,
          description,
          selectedSubcategory,
          realPrice,
          totalQuantity,
          WashcareInstructions,
          otherColors,
          primaryColor,
          material,
        })
        .then((res) => {
          if (res.data === "added") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your product successfully added',
              showConfirmButton: false,
              timer: 5000
            })
          } else if (res.data === "!added") {
       
          }
        });
;
    } catch (error) {
      console.log("Couldn't add product: ", error);
    }}
    else{

      Swal.fire(
        'Fill the all fields',
        'All field should be filled',
        'error'
      )
    }
    history("/dashboard")

  };
  const validate = () => {
    let selectedCategoryError = "";
    let selectedSubcategoryError = "";
    let productIdError = "";
    let realPriceError = "";
    let sellingPriceError = "";
    let descriptionError = "";
    let quantitiesError = "";
    let primaryColorError = "";
    let otherColorsError = "";
    let WashcareInstructionsError = "";
    let materialError = "";
    let brandError = "";

    if (!selectedCategory) {
      selectedCategoryError = "Select catregory";
    } 
    if (!selectedSubcategory) {
      selectedSubcategoryError = "Select subcategory";
    } 

    if (!productId) {
      productIdError = "type productid";
    } 

    if (!realPrice) {
      realPriceError = "please type a real price";
    } 
    if (!sellingPrice) {
      sellingPriceError = "please add selling price";
    } 
    if (!description) {
      descriptionError = "Please type description";
    } 
    if (!quantities) {
      quantitiesError = "Please type quantity";
    }
    if (!primaryColor) {
      primaryColorError = "Please type Primary color";
    } 
    if (!otherColors) {
      otherColorsError = "Please type secondary color";
    }
    if (!WashcareInstructions) {
      WashcareInstructionsError = "Please add some washcare instructions";
    }
    if (!material) {
      materialError = "Please add some materials";
    }
    if (!brand) {
      brandError = "Please add brand";
    }
 
    setSelectedCategoryError(selectedCategoryError);
    setSelectedSubcategoryError(selectedSubcategoryError);
    setProductIdError(productIdError);
    setRealPriceError(realPriceError);
    setSellingPriceError(sellingPriceError);
    setDescriptionError(descriptionError);
    setQuantitiesError(quantitiesError);
    setPrimaryColorError(primaryColorError);
    setOtherColorsError(otherColorsError);
    setCareInstructionsError(WashcareInstructionsError);
    setMaterialError(materialError);
    setbBrandError(brandError);

    if (
      productIdError ||
      realPriceError ||
      sellingPriceError ||
      descriptionError ||
      primaryColorError ||
      otherColorsError ||
      WashcareInstructionsError||
      materialError||
      brandError
    ) {
      return false;
    }

    return true;
  };


    const inputStyles = {
     
      border: '2px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f8f8f8',
      color: '#333',
      padding: '5px',
      
    };
    
  return (
    <div className={`${styles.container}`}>
      <form style={{marginTop:'50px'}} >
        <fieldset >
          <h1 className="text-red-400 font-extrabold">ADD PRODUCTS</h1>
          <div className="shadow-inner mt-3" >
           
           <div   className={styles.respo} >

         <div className={styles.labelinput}>
          
     
            <label className={styles.label} for="product_id">
              PRODUCT ID
            </label>
            {productIdError && (
                <span className="help-block text-danger">{productIdError}</span>
              )}
            <div >
              <input
                id="product_id"
                name="product_id"
                type="text"
                requiredTxt
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className={styles.inputField}
              />
              
            </div>
            </div>



          <div className="ml-3">
            <label className={styles.label} for="product_name">
              PRODUCT BRAND
            </label>
            {brandError && (
                <span className="help-block text-danger">{brandError}</span>
              )}
            <div >
              <input
                id="product_name"
                name="product_name"
                // placeholder="PRODUCT BRAND"
                className={styles.inputField}
                required=""
                type="text"
                value={brand}
                onChange={(e) => setbBrand(e.target.value)}
              />
            
            </div>
          </div>
       
          </div>
          </div>
          <div className="form-group">
            <label className={styles.label} for="product_description">
              PRODUCT DESCRIPTION
            </label>
            <div className={styles.texareadiv}>
              <textarea
                className={styles.textarea}
                id="product_description"
                name="product_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                
              ></textarea>
              {descriptionError && (
                <span className="help-block text-danger">{descriptionError}</span>
              )}
            </div>
          </div>
          
            <label className={styles.label} for="product_category">
              PRODUCT CATEGORY
            </label>
            <div  className={styles.respo}  >

            
            <div className={styles.categorydiv} >
              <select
                id="product_category"
                name="product_category"
                className="form-control"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {productCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
        

          {selectedCategory && (
            <div style={{marginLeft:'50px', width:'400px'}}>
              <label className={styles.label} for="product_subcategory">
                SUBCATEGORY
              </label>
              <div className={styles.Subcategorydiv}>
                <select
                  id="product_subcategory"
                  name="product_subcategory"
                  className="form-control"
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                  <option value="">Select a subcategory</option>
                  {categoriesWithSubcategories[selectedCategory].map(
                    (subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    )
                  )}
                </select>
                {selectedSubcategoryError && (
                  <span className="help-block text-danger">{selectedSubcategoryError}</span>
                )}
              </div>
            </div>
          )}
          </div>

          {selectedCategory && (
            <div className={`${styles.formGroup}`}>
              <label className={styles.label}  htmlFor="product_size">
                PRODUCT SIZE
              </label>
              <div className={styles.sizeselect} >
                <div className={`${styles.sizeButtons}`}>
                <div>
                  <h3 >Total Quantity: {totalQuantity}</h3>
                  </div>
                  <div>
                  {categorySizes[selectedCategory].map((size, index) => (
                    <div key={index} className={styles.sizeContainer} style={{display:'flex',flexDirection:'row'}}>
                      <div style={{width:'100px', display:'flex', flexDirection:'row'}}>
                      <h5
                        className={`${styles.sizeButton} ${
                          selectedSizes.includes(size)
                            ? styles.blue
                            : styles.blue
                        }`}
                        style={{width:'100px', display:'flex', flexDirection:'row'}}
                      >

                       

                        {size}
                      </h5>
                      </div>
                      <div>           
                                   <input
                        type="text"
                        // placeholder="Enter quantity"
                        value={quantities[size]}
                        onChange={(e) => handleQuantityChange(size, e)}
                        className={styles.quantityInput}
                        style={{border:'1px solid black', display:'flex', flexDirection:'row'}}
                      />
</div>

                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div >
            <label className={styles.label} htmlFor="product_price">
              PRODUCT PRICE
            </label>
            <div  className={styles.respo}  >
           
              <input
                style={{textIndent:'10px'}}
                id="product_real_price"
                name="product_real_price"
                placeholder="REAL PRICE"
                className={styles.inputField}
                required=""
                type="text"
                // style={{
                //   width: "45%",
                //   display: "inline-block",
                //   marginRight: "5px",
                // }}
                value={realPrice}
                onChange={handleRealPriceChange}
               
              
              />
              {realPriceError && (
                <span className="help-block text-danger">{realPriceError}</span>
              )}
             
              <input
               style={{textIndent:'10px'}}
                id="product_selling_price"
                name="product_selling_price"
                placeholder="SELLING PRICE"
                className={styles.inputField}
                required=""
                type="text"
                // style={{ width: "45%", display: "inline-block" }}
                value={sellingPrice}
                onChange={handleSellingPriceChange}
                
          
              />
              {sellingPriceError && (
                <span className="help-block text-danger">{sellingPriceError}</span>
              )}
            </div>
          </div>
          <div className={styles.label}>
            {realPrice !== "" &&
              sellingPrice !== "" &&
              sellingPrice <= realPrice && (
                <div>
                  <span
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    {sellingPrice === "0"
                      ? "FREE"
                      : `${
                          (
                            ((realPrice - sellingPrice) / realPrice) *
                            100
                          ).toFixed(2) || 0
                        }% OFF`}
                  </span>
                </div>
              )}
          </div>
          <div className={styles.colorsection}
           
          >
            <div
              className="form-group"
              style={{ display:'flex' ,flexDirection: "column" }}
            >
              <label className={styles.label} htmlFor="product_color">
                PRIMARY COLOR
              </label>
              <div className="input-wrapper" style={{display:'flex' ,flexDirection:'column'}}>
              
                <input
                  id="product_color"
                  name="product_color"
                  // placeholder="PRIMARY COLOR"
                  className={styles.inputField}
                  required=""
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  // style={{ width: "400px" }}
                />
                <h5>  <div style={{backgroundColor:primaryColor ,height:"30px",width:"30px"}}></div></h5>
                {primaryColorError && (
                  <span className="help-block text-danger">{primaryColorError}</span>
                )}
              </div>
            </div>

            <div
              className="form-group"
              // style={{ flexBasis: "100%", maxWidth: "100%" }}
            >
              <label className={styles.label} htmlFor="product_other_colors">
                OTHER COLOR
              </label>
              <div className="input-wrapper" style={{display:'flex',flexDirection:'column'}}>
                <input
                  id="product_other_colors"
                  name="product_other_colors"
                  // placeholder="OTHER COLORS"
                  className={styles.inputField}
                  type="color"
                  value={otherColors}
                  // style={{ width: "50%" }}
                  onChange={(e) => setOtherColors(e.target.value)}
                /> <h5>  <div style={{backgroundColor:otherColors,width:'30px',height:'30px'}}></div></h5>
                {otherColorsError && (
                  <span className="help-block text-danger">{otherColorsError}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className={styles.label} for="product_care_instructions">
              WASHCARE INSTRUCTIONS
            </label>
            <div >
              <textarea
                className={styles.texareawash}
                id="product_care_instructions"
                name="product_care_instructions"
                value={WashcareInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
                
              ></textarea>
              {WashcareInstructionsError && (
                <span className="help-block text-danger">{WashcareInstructionsError}</span>
              )}
            </div>
          </div>

          <div   >
            <label className={styles.label}for="product_material">
              MATERIAL
            </label>
            <div >
              <input style={{textIndent:'10px'}}
                id="product_material"
                name="product_material"
                placeholder="Add the material type..."
                className={styles.inputFieldmaterial}
                required=""
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              {materialError && (
                <span className="help-block text-danger">{materialError}</span>
              )}
            </div>
          </div>

      

       
            <div>
              <h3 className="font-extrabold">Upload images</h3>


<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Main image</label>
<input  onChange={convertToBase64} className="block w-full text-sm
 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">2nd image</label>
<input  onChange={convertToBase64} className="block w-full text-sm
 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">3rd image</label>
<input  onChange={convertToBase64} className="block w-full text-sm
 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">4th image</label>
<input  onChange={convertToBase64} className="block w-full text-sm
 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button
                  id="singlebutton"
                  name="singlebutton"
                  className="btn btn-danger"
                  onClick={addToCart}
                  
                >
                  Click me to Add
                </button>
              </div>
            </div>
          
        </fieldset>
      </form>
    </div>
  );
};
export default AddProduct;
