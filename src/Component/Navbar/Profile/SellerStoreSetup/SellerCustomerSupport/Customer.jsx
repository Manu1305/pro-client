// import React from "react";
// import { useState } from "react";
// import register from "./customer.module.css";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   MDBFooter,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBCard,
//   MDBCardImage,
//   MDBCardBody,
//   MDBInput,
//   MDBBtn,
// } from "mdb-react-ui-kit";
// import { Dropdown } from "react-bootstrap";

// export const CustomerSup = () => {
 
//   const [email, setEmail] = useState("");
 
//   const [phone, setPhone] = useState("");
  
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");

//   const user = useSelector((state)=> state.userReducer.user)

//     const [selectedState, setSelectedState] = useState("");
//   const countries = [
    
//     "India",
//     "Srilanka",
//     "America",
//     // Add more countries here
//   ];
//   const stateData = {
//     India: [
//       "Andhra Pradesh",
//       "Arunachal Pradesh",
//       "Assam",
//       "Bihar",
//       "Chhattisgarh",
//       "Goa",
//       "Gujarat",
//       "Haryana",
//       "Himachal Pradesh",
//       "Jharkhand",
//       "Karnataka",
//       "Kerala",
//       "Madhya Pradesh",
//       "Maharashtra",
//       "Manipur",
//       "Meghalaya",
//       "Mizoram",
//       "Nagaland",
//       "Odisha",
//       "Punjab",
//       "Rajasthan",
//       "Sikkim",
//       "Tamil Nadu",
//       "Telangana",
//       "Tripura",
//       "Uttar Pradesh",
//       "Uttarakhand",
//       "West Bengal",
//       "Andaman and Nicobar Islands",
//       "Chandigarh",
//       "Dadra and Nagar Haveli and Daman and Diu",
//       "Delhi",
//       "Ladakh",
//       "Lakshadweep",
//       "Puducherry",
//     ],
//     USA: ["State A", "State B", "State C"],
//     // Add more countries and states as needed
//   };


 
//      const handleCountrySelect = (country) => {
//        setSelectedCountry(country);
//        setSelectedState("");
//      };
 

  
    


//   return (
//     <div>
//       <MDBContainer className="my-5">
//         <MDBCard>
//           <MDBRow className="g-0">
//             <MDBCol md="6">
//               <img
//                 src="https://img.freepik.com/free-vector/success-businessman-abstract-business-vector-illustration-template_460848-13495.jpg"
//                 className={register.img1}
//               />

//               {/* <MDBCardImage
//                                 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcnRbIxX2lOc34LJWI9oN8xryoEgJTA4HaLfci0tSEZV4VyNFYDQ4-_d7SwdRxkmOMnWM&usqp=CAU'
//                                 alt="login form"
//                                 className='rounded-start w-100'
//                                 style={{ height: 500 }}
//                             /> */}
//             </MDBCol>
//             <MDBCol md="6">
//               <MDBCardBody className="d-flex flex-column">
//                 <div className="d-flex flex-row mt-2">
//                   {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}

//                   <span className="h1 fw-bold mb-0">Customer setup</span>
//                 </div>
//                 <h5
//                   className="fw-normal my-4 pb-3"
//                   style={{ letterSpacing: "1px" }}
//                 ></h5>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     Phone No.
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="number"
//                     size="lg"
//                     value={user.phone}
//                     // onChange={(e) => setPhone(e.target.value)}
//                     className="w-85"
//                   />
//                 </div>

//                 {/* //-------------------email...................//// */}

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     Email address.
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="email"
//                     size="lg"
//                     value={user.email}
//                     // onChange={(e) => setEmail(e.target.value)}
//                     className="w-85"
//                   />
//                 </div>
//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                    Area
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="text"
//                     size="lg"
//                     value={address1}
//                     onChange={(e) => setAddress1(e.target.value)}
//                     className="w-85"
//                   />
//                 </div>
//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     Locality
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="text"
//                     size="lg"
//                     value={address2}
//                     onChange={(e) => setAddress2(e.target.value)}
//                     className="w-85"
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     Country
//                   </label>
//                   <Dropdown>
//                     <Dropdown.Toggle
//                       id="formControlLg"
//                       size="lg"
//                       className="w-85 bg-warning"
//                       disabled
//                     >
//                       {selectedCountry || "Select Country"}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       {countries.map((country, index) => (
//                         <Dropdown.Item
//                           key={index}
//                           onClick={() => handleCountrySelect(country)}
//                         >
//                           {country}
//                         </Dropdown.Item>
//                       ))}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </div>
//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     State
//                   </label>
//                   <Dropdown>
//                     <Dropdown.Toggle
//                       id="stateDropdown"
//                       size="lg"
//                       className="w-85 bg-warning"
//                       disabled
//                     >
//                       {selectedState || "Select State"}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu
//                       style={{ maxHeight: "200px", overflowY: "auto" }}
//                     >
//                       {selectedCountry &&
//                         stateData[selectedCountry]?.map((state, index) => (
//                           <Dropdown.Item
//                             key={index}
//                             onClick={() => setSelectedState(state)}
//                           >
//                             {state}
//                           </Dropdown.Item>
//                         ))}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     City/Town
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="text"
//                     size="lg"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     className="w-85"
//                     disabled
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center mb-4">
//                   <label
//                     htmlFor="formControlLg"
//                     className="form-label me-3 w-25"
//                   >
//                     Pincode/Zip code
//                   </label>
//                   <MDBInput
//                     id="formControlLg"
//                     type="number"
//                     size="lg"
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                     className="w-85"
//                   />
//                 </div>
// {/* 
//                 <div className="d-flex justify-content-center">
//                   <button className="btn btn-dark mx-2" color="dark" size="lg">
//                     Submit
//                   </button>
//                   <button
//                     className="btn btn-danger mx-2 border-only"
//                     color="light"
//                     size="lg"
//                   >
//                <Link to="/seo">Skip</Link>
//                   </button>
//                 </div> */}

             
//                 {/* <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
//                   Already have an account?{" "}
//                   <Link to="/login" style={{ color: "#393f81" }}>
//                     login here
//                   </Link>
//                 </p> */}
//                 {/* <div className="d-flex flex-row justify-content-start">
//                   <a href="#!" className="small text-muted me-1">
//                     Terms of use.
//                   </a>
               
//                 </div> */}
//               </MDBCardBody>
//             </MDBCol>
//           </MDBRow>
//         </MDBCard>
//       </MDBContainer>
//     </div>
//   );
// }; 

// // export default SellerRegister


import React from "react";
import { useState } from "react";
import register from "./customer.module.css";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
// import { Dropdown } from "react-bootstrap";

 const CustomerSup = () => {
  const user = useSelector((state)=> state.userReducer.user)


  

    const [selectedState, setSelectedState] = useState("");
  const countries = [
    
    "India",
    "Srilanka",
    "America",
    // Add more countries here
  ];
  const stateData = {
    India: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ],
    USA: ["State A", "State B", "State C"],
  };


 
    //  const handleCountrySelect = (country) => {
    //    setSelectedCountry(country);
    //    setSelectedState("");
    //  };
 

  
    


  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img
                src="https://img.freepik.com/free-vector/success-businessman-abstract-business-vector-illustration-template_460848-13495.jpg"
                className={register.img1}
              />

         
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">

                  <span className="h1 fw-bold mb-0">Customer setup</span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                ></h5>

                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Phone No.
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="number"
                    size="lg"
                    value={user.phone}
                  
                    className="w-85"
                  />
                </div>

              

                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Email
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={user.email}
                    className="w-85"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                   House No.& Locality
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.locality}
                    className="w-85"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                   Area
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.area}
                    className="w-85"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Country
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.country}
                    className="w-85"
                  />
               
                </div>
                
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    State
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.selectedState
                    }
                    className="w-85"
                  />
                 </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    City/Town
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.
                      city}
                    // onChange={(e) => setCity(e.target.value)}
                    className="w-85"
                    disabled
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Pincode/Zip code
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="number"
                    size="lg"
                    value={user.address.pincode}
                    // onChange={(e) => setPincode(e.target.value)}
                    className="w-85 dark"
                  />
                </div>

                {/* <div className="d-flex justify-content-center">
                  <button className="btn btn-dark mx-2" color="dark" size="lg">
                    Submit
                  </button>
                  <button
                    className="btn btn-danger mx-2 border-only"
                    color="light"
                    size="lg"
                  >
               <Link to="/seo">Skip</Link>
                  </button>
                </div> */}

             
               
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default CustomerSup