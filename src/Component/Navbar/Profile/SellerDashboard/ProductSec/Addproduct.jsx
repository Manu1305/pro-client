// // akashay

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import styles from "./Addproduct.module.css";
// import Swal from 'sweetalert2'
// import { apiURL } from "../../../../../const/config";
// import httpService from "../../../../Error Handling/httpService";
// // const initialValues={
// //   name: "",
// //   price: "",
// //   description: "",
// //   image: "",
// //   category: "",
// // }
// const AddProduct = () => {

//   const user = useSelector((state) => state.userReducer.user);
//   const history = useNavigate();

//   const categorySizes = {
//     Men: [],
//     Womens: [],
//     Kids: [],
//   };
  
//   const sizeSelected={
//     Shirts: ["S", "M", "L", "XL","XXL"],
//     Pants: [28, 30, 32, 34, 36, 38, 40],
//     top:[
//       "XS",
//       "S",
//       "M",
//       "L",
//       "XL",
//       "XXL",
//       "XXXL",
//       "4XL",
//       "5XL"
//   ],
//     Bottom: [
//       "XS",
//       "S",
//       "M",
//       "L",
//       "XL",
//       "XXL",
//       "XXXL",
//       "4XL",
//       "5XL"
//   ],
//     Sarees: [
//       "5.5 meters",
//       "6 meters",
//       "6.5 meters",
//       "7 meters",
//       "9 yards"
//   ],
//     KidsShirt:  [
//       "2T",   
//       "3T",  
//       "4T",  
//       "XS",        "S",   "M",    "L",   "XL",    ],
//       kidspants:[
//       "2T",
//       "3T",
//       "4T",
//       "XS",
//       "S",
//       "M",
//       "L",
//       "XL"
//   ]
//   ,
//     shorts: [
//       "2T",
//       "3T",
//       "4T",
//       "XS",
//       "S",
//       "M",
//       "L",
//       "XL"
//   ],
//   }

//   const categoriesWithSubcategories = {
//     Men: [  "Shirts","Pants",
//    ],
//    Womens:["top","Bottom","Sarees"],
//    Kids:["KidsShirt","KidsBaniyans","kidspants","shorts"]
//  };

//   const Collections = {
//     Shirts: [
//       "Dress Shirts",
//       "T-Shirts",
//       "Polo Shirts",
//       "Casual Button-Up Shirts",
//       "Flannel Shirts",
//       "Henley Shirts",
//       "Sweatshirts",
//       "Hoodies"
//   ],
//     Pants:  [
//       "Jeans",
//       "Chinos",
//       "Dress Pants",
//       "Cargo Pants",
//       "Sweatpants",
//       "Joggers",
//       "Track Pants",
//       "Corduroy Pants"
//   ],
//     top: [
//       "Blouses",
//       "T-Shirts",
//       "Tank Tops",
//       "Crop Tops",
//       "Sweaters",
//       "Cardigans",
//       "Hoodies",
//       "Peplum Tops",
//       "Tunics",
//       "Button-Up Shirts",
//       "Bodysuits",
//       "Off-the-Shoulder Tops",
//       "Wrap Tops",
//       "Tube Tops",
//       "Kimono Tops",
//       "Polo Shirts",
//       "Camisoles",
//       "Cold Shoulder Tops",
//       "Cowl Neck Tops",
//       "Ruffle Tops"
//   ],
//     Bottom:  [
//       "Jeans",
//       "Leggings",
//       "Trousers",
//       "Skirts",
//       "Shorts",
//       "Culottes",
//       "Palazzo Pants",
//       "Joggers",
//       "Capri Pants",
//       "Wide-Leg Pants",
//       "Cargo Pants",
//       "Pencil Skirts",
//       "A-line Skirts",
//       "Maxi Skirts",
//       "Mini Skirts",
//       "Flared Skirts",
//       "Denim Skirts",
//       "Pleated Skirts",
//       "High-Waisted Pants",
//       "Harem Pants"
//   ],
//     Sarees:  [
//       "Silk Sarees",
//       "Cotton Sarees",
//       "Chiffon Sarees",
//       "Georgette Sarees",
//       "Banarasi Sarees",
//       "Kanjivaram Sarees",
//       "Designer Sarees",
//       "Bridal Sarees",
//       "Linen Sarees",
//       "Printed Sarees",
//       "Net Sarees",
//       "Half-and-Half Sarees",
//       "Satin Sarees",
//       "Embroidered Sarees",
//       "Saree with Blouse Sets",
//       "Traditional Sarees",
//       "Bollywood Sarees",
//       "Party Wear Sarees",
//       "Casual Sarees",
//       "Lehenga Sarees"
//   ],
//     KidsShirt: [
//       "T-Shirts",
//       "Polo Shirts",
//       "Button-Up Shirts",
//       "Graphic Tees",
//       "Long Sleeve Shirts",
//       "Hoodies",
//       "Sweatshirts",
//       "Tank Tops",
//       "Henley Shirts",
//       "Flannel Shirts",
//       "Sport Jerseys",
//       "Printed Shirts",
//       "Casual Shirts",
//       "Dress Shirts",
//       "Chambray Shirts",
//       "Uniform Shirts",
//       "Ruffle Tops (for girls)",
//       "Peplum Tops (for girls)",
//       "Bodysuits (for infants)"
//   ],
    
//     kidspants:  [
//       "Jeans",
//       "Leggings",
//       "Trousers",
//       "Shorts",
//       "Cargo Pants",
//       "Sweatpants",
//       "Joggers",
//       "Track Pants",
//       "Corduroy Pants",
//       "Khaki Pants",
//       "Chinos",
//       "Capri Pants",
//       "Denim Pants",
//       "Athletic Pants",
//       "Overalls",
//       "School Uniform Pants",
//       "Printed Pants",
//       "Convertible Pants (with zip-off legs)",
//       "Dress Pants",
//       "Stretch Pants"
//   ],
//     shorts:[
//       "Denim Shorts",
//       "Athletic Shorts",
//       "Cargo Shorts",
//       "Bermuda Shorts",
//       "Chino Shorts",
//       "Board Shorts",
//       "Cotton Shorts",
//       "Khaki Shorts",
//       "Printed Shorts",
//       "Linen Shorts",
//       "Track Shorts",
//       "Pull-On Shorts",
//       "School Uniform Shorts",
//       "Sweat Shorts",
//       "Jogger Shorts",
//       "Running Shorts",
//       "Basketball Shorts",
//       "Active Shorts",
//       "Pleated Shorts",
//       "Swim Shorts"
//   ]
//   ,
    
//   };


  
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedCollections, setselectedCollections] = useState("");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");
//   const productCategories = Object.keys(categorySizes);
//   const [productId, setProductId] = useState("");
//   const [realPrice, setRealPrice] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [quantities, setQuantities] = useState({});
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [primaryColor, setPrimaryColor] = useState("");
//   const [otherColors, setOtherColors] = useState("");
//   const [WashcareInstructions, setCareInstructions] = useState("");
//   const [material, setMaterial] = useState("");
//   const [brand, setbBrand] = useState("");
//   const [images, setImages] = useState({});

//   const [selectedCategoryError, setSelectedCategoryError] = useState("");
//   const [selectedSubcategoryError, setSelectedSubcategoryError] = useState("");
 
//   const [productIdError, setProductIdError] = useState("");
//   const [realPriceError, setRealPriceError] = useState("");
//   const [sellingPriceError, setSellingPriceError] = useState("");
//   const [descriptionError, setDescriptionError] = useState("");
//   const [quantitiesError, setQuantitiesError] = useState({});

//   const [primaryColorError, setPrimaryColorError] = useState("");
//   const [otherColorsError, setOtherColorsError] = useState("");
//   const [WashcareInstructionsError, setCareInstructionsError] = useState("");
//   const [materialError, setMaterialError] = useState("");
//   const [brandError, setbBrandError] = useState("");


//   const [selectedSizes, setSelectedSizes] = useState([]);

//   const handleQuantityChange = (size, event) => {
//     const { value } = event.target;
//     const updatedQuantities = { ...quantities, [size]: value };
//     setQuantities(updatedQuantities);

//     let sum = 0;
//     for (const size in updatedQuantities) {
//       sum += Number(updatedQuantities[size]);
//     }
//     setTotalQuantity(sum);
//   };

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);
//     setSelectedSubcategory("");
//   };

//   const handleRealPriceChange = (e) => {
//     setRealPrice(e.target.value);
//   };

//   const handleSellingPriceChange = (e) => {
//     setSellingPrice(e.target.value);
//   };

//   const convertToBase64 = (event) => {
    
//     let reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload = () => {
   
//       setImages({ ...images, [event.target.name]: reader.result });
//     };
//     reader.onerror = (error) => {
//       console.log("ERROR", error);
//     };
//   };

//   useEffect(() => {
    
//   }, [images]);

//   // add product btn
//   const addtodatabase = async (e) => {
//     e.preventDefault();
//     const isValid = validate();
//     if (isValid) {
//     try {
//       await httpService
//         .post(`${apiURL}/product/add-new-product`, {
//           seller: user.email,
//           productId,
//           brand,
//           sellingPrice,
//           selectedCategory,
//           selectedSizes: [
//             selectedSizes[0],
//             selectedSizes[1],
//             selectedSizes[2],
//             selectedSizes[3],
//           ],
//           images,
//           quantities: quantities,
//           description,
//           selectedSubcategory,
//           // selectedCollections,
//           realPrice,
//           totalQuantity,
//           WashcareInstructions,
//           otherColors,
//           primaryColor,
//           material,
//         })
//         .then((res) => {
//           if (res.data === "added") {
//             Swal.fire({
//               position: 'center',
//               icon: 'success',
//               title: 'Your product successfully added',
//               showConfirmButton: false,
//               timer: 5000
//             })
//           } else if (res.data === "!added") {
       
//           }
//         });
// ;
//     } catch (error) {
//       console.log("Couldn't add product: ", error);
//     }}
//     else{

//       Swal.fire(
//         'Fill the all fields',
//         'All field should be filled',
//         'error'
//       )
//     }
//     history("/dashboard")

//   };
//   const validate = () => {
//     let selectedCategoryError = "";
//     let selectedSubcategoryError = "";
//     let productIdError = "";
//     let realPriceError = "";
//     let sellingPriceError = "";
//     let descriptionError = "";
//     let quantitiesError = "";
//     let primaryColorError = "";
//     let otherColorsError = "";
//     let WashcareInstructionsError = "";
//     let materialError = "";
//     let brandError = "";

//     if (!selectedCategory) {
//       selectedCategoryError = "Select catregory";
//     } 
//     if (!selectedSubcategory) {
//       selectedSubcategoryError = "Select subcategory";
//     } 

//     if (!productId) {
//       productIdError = "type productid";
//     } 

//     if (!realPrice) {
//       realPriceError = "please type a real price";
//     } 
//     if (!sellingPrice) {
//       sellingPriceError = "please add selling price";
//     } 
//     if (!description) {
//       descriptionError = "Please type description";
//     } 
//     if (!quantities) {
//       quantitiesError = "Please type quantity";
//     }
//     if (!primaryColor) {
//       primaryColorError = "Please type Primary color";
//     } 
//     if (!otherColors) {
//       otherColorsError = "Please type secondary color";
//     }
//     if (!WashcareInstructions) {
//       WashcareInstructionsError = "Please add some washcare instructions";
//     }
//     if (!material) {
//       materialError = "Please add some materials";
//     }
//     if (!brand) {
//       brandError = "Please add brand";
//     }
 
//     setSelectedCategoryError(selectedCategoryError);
//     setSelectedSubcategoryError(selectedSubcategoryError);
//     setProductIdError(productIdError);
//     setRealPriceError(realPriceError);
//     setSellingPriceError(sellingPriceError);
//     setDescriptionError(descriptionError);
//     setQuantitiesError(quantitiesError);
//     setPrimaryColorError(primaryColorError);
//     setOtherColorsError(otherColorsError);
//     setCareInstructionsError(WashcareInstructionsError);
//     setMaterialError(materialError);
//     setbBrandError(brandError);

//     if (
//       productIdError ||
//       realPriceError ||
//       sellingPriceError ||
//       descriptionError ||
//       primaryColorError ||
//       otherColorsError ||
//       WashcareInstructionsError||
//       materialError||
//       brandError
//     ) {
//       return false;
//     }

//     return true;
//   };


//     const inputStyles = {
     
//       border: '2px solid #ccc',
//       borderRadius: '5px',
//       backgroundColor: '#f8f8f8',
//       color: '#333',
//       padding: '5px',
      
//     };
    
//   return (
//     <div className={`${styles.container}`}>
//       <form style={{marginTop:'50px'}} >
//         <fieldset >
//           <h1 className="text-red-400 font-extrabold">ADD PRODUCTS</h1>
//           <div className="shadow-inner mt-3" >
           
//            <div   className={styles.respo} >

//          <div className={styles.labelinput}>
          
     
//             <label className={styles.label} for="product_id">
//               PRODUCT ID
//             </label>
//             {productIdError && (
//                 <span className="help-block text-danger">{productIdError}</span>
//               )}
//             <div >
//               <input
//                 id="product_id"
//                 name="product_id"
//                 type="text"
//                 requiredTxt
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 className={styles.inputField}
//               />
              
//             </div>
//             </div>



//           <div className="ml-3">
//             <label className={styles.label} for="product_name">
//               PRODUCT BRAND
//             </label>
//             {brandError && (
//                 <span className="help-block text-danger">{brandError}</span>
//               )}
//             <div >
//               <input
//                 id="product_name"
//                 name="product_name"
//                 // placeholder="PRODUCT BRAND"
//                 className={styles.inputField}
//                 required=""
//                 type="text"
//                 value={brand}
//                 onChange={(e) => setbBrand(e.target.value)}
//               />
            
//             </div>
//           </div>
       
//           </div>
//           </div>
//           <div className="form-group">
//             <label className={styles.label} for="product_description">
//               PRODUCT DESCRIPTION
//             </label>
//             <div className={styles.texareadiv}>
//               <textarea
//                 className={styles.textarea}
//                 id="product_description"
//                 name="product_description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 style={{border: '2px solid black'}}
                
//               ></textarea>
//               {descriptionError && (
//                 <span className="help-block text-danger">{descriptionError}</span>
//               )}
//             </div>
//           </div>
          
//             <label className={styles.label} for="product_category">
//               PRODUCT CATEGORY
//             </label>
//             <div  className={styles.respo}  >

            
//             <div className={styles.categorydiv} >
//               <select
//                 id="product_category"
//                 name="product_category"
//                 className="form-control"
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Select a category</option>
//                 {productCategories.map((category, index) => (
//                   <option key={index} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
        

//           {selectedCategory && (
//             <div style={{marginLeft:'50px', width:'400px'}}>
//               <label className={styles.label} for="product_subcategory">
//                 SUBCATEGORY
//               </label>
//               <div className={styles.Subcategorydiv}>
//                 <select
//                   id="product_subcategory"
//                   name="product_subcategory"
//                   className="form-control"
//                   value={selectedSubcategory}
//                   onChange={(e) => setSelectedSubcategory(e.target.value)}
//                 >
//                   <option value="">Select a subcategory</option>
//                   {categoriesWithSubcategories[selectedCategory].map(
//                     (subcategory, index) => (
//                       <option key={index} value={subcategory}>
//                         {subcategory}
//                       </option>
//                     )
//                   )}
//                 </select>
//                 {selectedSubcategory && (
//                   <span className="help-block text-danger">{selectedSubcategoryError}</span>
//                 )}
//               </div>
//             </div>
//           )}
//           </div>
//           {selectedSubcategory && (
//             <div style={{marginLeft:'50px', width:'400px'}}>
//               <label className={styles.label} for="product_subcategory">
//                 COLLECTIONS
//               </label>
//               <div className={styles.Subcategorydiv}>
//                 <select
//                   id="product_subcategory"
//                   name="product_subcategory"
//                   className="form-control"
//                   value={selectedCollections}
//                   onChange={(e) => setselectedCollections(e.target.value)}
//                 >
//                   <option value="">Select Collection</option>
//                   {Collections[selectedSubcategory].map(
//                     (selectedCollections, index) => (
//                       <option key={index} value={selectedCollections}>
//                         {selectedCollections}
//                       </option>
//                     )
//                   )}
//                 </select>
//                 {selectedSubcategoryError && (
//                   <span className="help-block text-danger">{selectedSubcategoryError}</span>
//                 )}
//               </div>
//             </div>
//           )}
//           {selectedSubcategory && (
//             <div className={`${styles.formGroup}`}>
//               <label className={styles.label}  htmlFor="product_size">
//                 PRODUCT SIZE
//               </label>
//               <div className={styles.sizeselect} >
//                 <div className={`${styles.sizeButtons}`}>
//                 <div>
//                   <h3 >Total Quantity: {totalQuantity}</h3>
//                   </div>
//                   <div>
//                   {sizeSelected[selectedSubcategory].map((size, index) => (
//                     <div key={index} className={styles.sizeContainer} style={{display:'flex',flexDirection:'row'}}>
//                       <div style={{width:'100px', display:'flex', flexDirection:'row'}}>
//                       <h5
//                         className={`${styles.sizeButton} ${
//                           selectedSizes.includes(size)
//                             ? styles.blue
//                             : styles.blue
//                         }`}
//                         style={{width:'100px', display:'flex', flexDirection:'row'}}
//                       >

                       

//                         {size}
//                       </h5>
//                       </div>
//                       <div>           
//                                    <input
//                         type="text"
//                         // placeholder="Enter quantity"
//                         value={quantities[size]}
//                         onChange={(e) => handleQuantityChange(size, e)}
//                         className={styles.quantityInput}
//                         style={{border:'1px solid black', display:'flex', flexDirection:'row'}}
//                       />
// </div>

//                     </div>
//                   ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div >
//             <label className={styles.label} htmlFor="product_price">
//               PRODUCT PRICE
//             </label>
//             <div  className={styles.respo}  >
           
//               <input
//                 style={{textIndent:'10px',border:'1px solid black'}}
//                 id="product_real_price"
//                 name="product_real_price"
//                 placeholder="REAL PRICE"
//                 className={styles.inputField}
//                 required=""
//                 type="text"
//                 // style={{
//                 //   width: "45%",
//                 //   display: "inline-block",
//                 //   marginRight: "5px",
//                 // }}
//                 value={realPrice}
//                 onChange={handleRealPriceChange}
               
              
//               />
//               {realPriceError && (
//                 <span className="help-block text-danger">{realPriceError}</span>
//               )}
             
//               <input
//                style={{textIndent:'10px',marginLeft:'10px',border:'1px solid black'}}
//                 id="product_selling_price"
//                 name="product_selling_price"
//                 placeholder="SELLING PRICE"
//                 className={styles.inputField}
//                 required=""
//                 type="text"
//                 // style={{ width: "45%", display: "inline-block" }}
//                 value={sellingPrice}
//                 onChange={handleSellingPriceChange}
                
          
//               />
//               {sellingPriceError && (
//                 <span className="help-block text-danger">{sellingPriceError}</span>
//               )}
//             </div>
//           </div>
//           <div className={styles.label}>
//             {realPrice !== "" &&
//               sellingPrice !== "" &&
//               sellingPrice <= realPrice && (
//                 <div>
//                   <span
//                     style={{
//                       fontSize: "1rem",
//                     }}
//                   >
//                     {sellingPrice === "0"
//                       ? "FREE"
//                       : `${
//                           (
//                             ((realPrice - sellingPrice) / realPrice) *
//                             100
//                           ).toFixed(2) || 0
//                         }% OFF`}
//                   </span>
//                 </div>
//               )}
//           </div>
//           <div className={styles.colorsection}
           
//           >
//             <div
//               className="form-group"
//               style={{ display:'flex' ,flexDirection: "column" }}
//             >
//               <label className={styles.label} htmlFor="product_color">
//                 PRIMARY COLOR
//               </label>
//               <div className="input-wrapper" style={{display:'flex' ,flexDirection:'column'}}>
              
//                 <input
//                   id="product_color"
//                   name="product_color"
//                   // placeholder="PRIMARY COLOR"
//                   className={styles.inputField}
//                   required=""
//                   type="color"
//                   value={primaryColor}
//                   onChange={(e) => setPrimaryColor(e.target.value)}
//                   // style={{ width: "400px" }}
//                 />
//                 <h5>  <div style={{backgroundColor:primaryColor ,height:"30px",width:"30px"}}></div></h5>
//                 {primaryColorError && (
//                   <span className="help-block text-danger">{primaryColorError}</span>
//                 )}
//               </div>
//             </div>

//             <div
//               className="form-group"
//               // style={{ flexBasis: "100%", maxWidth: "100%" }}
//             >
//               <label className={styles.label} htmlFor="product_other_colors">
//                 OTHER COLOR
//               </label>
//               <div className="input-wrapper" style={{display:'flex',flexDirection:'column',marginLeft:'10px'}}>
//                 <input
//                   id="product_other_colors"
//                   name="product_other_colors"
//                   // placeholder="OTHER COLORS"
//                   className={styles.inputField}
//                   type="color"
//                   value={otherColors}
//                   // style={{ width: "50%" }}
//                   onChange={(e) => setOtherColors(e.target.value)}
//                 /> <h5>  <div style={{backgroundColor:otherColors,width:'30px',height:'30px'}}></div></h5>
//                 {otherColorsError && (
//                   <span className="help-block text-danger">{otherColorsError}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div >
//             <label className={styles.label} for="product_care_instructions">
//               WASHCARE INSTRUCTIONS
//             </label>
//             <div >
//               <textarea
//                 className={styles.texareawash}
//                 id="product_care_instructions"
//                 name="product_care_instructions"
//                 value={WashcareInstructions}
//                 onChange={(e) => setCareInstructions(e.target.value)}
                
//               ></textarea>
//               {WashcareInstructionsError && (
//                 <span className="help-block text-danger">{WashcareInstructionsError}</span>
//               )}
//             </div>
//           </div>

//           <div   >
//             <label className={styles.label}for="product_material">
//               MATERIAL
//             </label>
//             <div >
//               <input style={{textIndent:'10px'}}
//                 id="product_material"
//                 name="product_material"
//                 placeholder="Add the material type..."
//                 className={styles.inputFieldmaterial}
//                 required=""
//                 type="text"
//                 value={material}
//                 onChange={(e) => setMaterial(e.target.value)}
//               />
//               {materialError && (
//                 <span className="help-block text-danger">{materialError}</span>
//               )}
//             </div>
//           </div>

      

       
//             <div>
//               <h3 className="font-extrabold">Upload images</h3>


// <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Main image</label>
// <input  onChange={convertToBase64} className="block w-full text-sm
//  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
// <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
// <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">2nd image</label>
// <input  onChange={convertToBase64} className="block w-full text-sm
//  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
// <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
// <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">3rd image</label>
// <input  onChange={convertToBase64} className="block w-full text-sm
//  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
// <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
// <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">4th image</label>
// <input  onChange={convertToBase64} className="block w-full text-sm
//  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
// <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


//               <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
//                 <button
//                   id="singlebutton"
//                   name="singlebutton"
//                   className="btn btn-danger"
//                   onClick={addtodatabase}
                  
//                 >
//                   Click me to Add
//                 </button>
//               </div>
//             </div>
          
//         </fieldset>
//       </form>
//     </div>
//   );
// };
// export default AddProduct;



// newwwwwwwwwwwwwwwwwwwwwwwwwww




import React from "react";
import styles from "./Addproduct.module.css";
import { useState } from "react";
import Swal from 'sweetalert2'
import httpService from "../../../../Error Handling/httpService";
import { apiURL } from "../../../../../const/config";
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux";



function AddProduct() {
  const user = useSelector((state) => state.userReducer.user);
  const history = useNavigate();

    const categorySizes = {
        Men: [],
        Womens: [],
        Kids: [],
      };
      const Collections = {
        Shirts: [
          "Dress Shirts",
          "T-Shirts",
          "Polo Shirts",
          "Casual Button-Up Shirts",
          "Flannel Shirts",
          "Henley Shirts",
          "Sweatshirts",
          "Hoodies"
      ],
        Pants:  [
          "Jeans",
          "Chinos",
          "Dress Pants",
          "Cargo Pants",
          "Sweatpants",
          "Joggers",
          "Track Pants",
          "Corduroy Pants"
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
          "Ruffle Tops"
      ],
        Bottom:  [
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
          "Harem Pants"
      ],
        Sarees:  [
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
          "Lehenga Sarees"
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
          "Bodysuits (for infants)"
      ],
        
        kidspants:  [
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
          "Stretch Pants"
      ],
        shorts:[
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
          "Swim Shorts"
      ]
      ,
        
      };

      const sizeSelected={
        Shirts: ["S", "M", "L", "XL","XXL"],
        Pants: [28, 30, 32, 34, 36, 38, 40],
        top:[
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "XXXL",
          "4XL",
          "5XL"
      ],
        Bottom: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "XXXL",
          "4XL",
          "5XL"
      ],
        Sarees: [
          "5.5 meters",
          "6 meters",
          "6.5 meters",
          "7 meters",
          "9 yards"
      ],
        KidsShirt:  [
          "2T",   
          "3T",  
          "4T",  
          "XS",        "S",   "M",    "L",   "XL",    ],
          kidspants:[
          "2T",
          "3T",
          "4T",
          "XS",
          "S",
          "M",
          "L",
          "XL"
      ]
      ,
        shorts: [
          "2T",
          "3T",
          "4T",
          "XS",
          "S",
          "M",
          "L",
          "XL"
      ],
      }
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



  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollections, setselectedCollections] = useState("");
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
  const [selectedSizes, setSelectedSizes] = useState([]);


    const categoriesWithSubcategories = {
        Men: [  "Shirts","Pants",
       ],
       Womens:["top","Bottom","Sarees"],
       Kids:["KidsShirt","KidsBaniyans","kidspants","shorts"]
     };    
     const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedSubcategory("");
      };
    
      const addtodatabase = async (e) => {
        e.preventDefault();
        // const isValid = validate();
        const isValid= true;

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
              // selectedCollections,
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
              Product Title
            </label>
            <input
              type="text"
              id="title"
              value={productId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter product title"
              required
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                 
                ></textarea>
              </div>
            </div>
          </form>
            </div>

<div>

</div>
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
              value={material}
                onChange={(e) => setMaterial(e.target.value)}
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
              value={brand}
              onChange={(e) => setbBrand(e.target.value)}
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
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter price"
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
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Selling price"
              required
              value={sellingPrice}
                onChange={(e)=>
                    setSellingPrice(e.target.value)}
                
                
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
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>

          <div className="mt-4 flex-row">
           
            <div style={{display:'flex', flexDirection:'row'}}> 

           
            {selectedSubcategory && (
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
                  {sizeSelected[selectedSubcategory].map((size, index) => (
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
           
            </div>
          </div>

    {primaryColor &&(

    <div>
<div style={{marginTop:'30px'}}>
<h3>Product image</h3>
<br />
<h4>Add the product main image</h4>
          <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden"  onChange={convertToBase64} />
    </label>
</div> 

</div>

<div style={{marginTop:'30px'}}>
<h3>Add additional product image </h3>
<br />

          <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden"  onChange={convertToBase64} />
    </label>
</div> 

</div>
    </div>
    )}


<div className="flex justify-center items-center">
  <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-500">Add color variant</button>
</div>


         
        </div>

        <div className={styles.maintwo}>
        <div style={{width:'300px',marginLeft:'40px'}}>
          <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product category</label>
<select id="product_category" name="product_category" onChange={handleCategoryChange}  value={selectedCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a category</option>
  {productCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
</select>
            </div>
           {selectedCategory && (  
            <div style={{width:'300px',marginLeft:'40px'}}>
          <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product Subcategory</label>
<select id="category"  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a subcategory</option>
  {categoriesWithSubcategories[selectedCategory].map(
                    (subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    )
                  )}
</select>
            </div> 
           )}  
             {selectedSubcategory && (  
            <div style={{width:'300px',marginLeft:'40px'}}>
          <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select collection</label>
<select id="subcategory"   value={selectedCollections}
                  onChange={(e) => setselectedCollections(e.target.value)}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choose a Collections</option>
  {Collections[selectedSubcategory].map(
                    (selectedCollections, index) => (
                      <option key={index} value={selectedCollections}>
                        {selectedCollections}
                      </option>
                    )
                  )}
</select>
            </div> 
           )} 
           
           <div style={{marginLeft:'30px'}}>

<label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Washcare information</label>
<textarea id="message"  value={WashcareInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
                 rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter washcare description of product here..."></textarea>
           </div>


<h3 style={{marginLeft:'30px'}}>Product Summary</h3>

<div style={{marginLeft:"30px"}} className="block p-2.5 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<div style={{display:'flex', flexDirection:'row'}}>
<h2>Product category</h2> <h2>{selectedCategory}</h2>    </div>
<div style={{display:'flex', flexDirection:'row'}}>

<h2>Product Description</h2> <h2>{description}</h2>
</div>
<div style={{display:'flex', flexDirection:'row'}}>
<h2>Selling price</h2><h2>{sellingPrice}</h2>

</div>
<div style={{display:'flex', flexDirection:'row'}}>

<h2>Total price</h2><h2>199</h2>
</div>
<div style={{marginLeft:"10px"}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<h3>Product color code:{primaryColor} </h3>

</div>

</div>

<div className="flex justify-center items-center">
  <button type="button" onClick={addtodatabase} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-600 rounded-lg border border-gray-200 hover:bg-freen-800 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
</div>


        </div>
      </div>
    </div>
  );
}

export default AddProduct;
