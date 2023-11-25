

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
  
  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img
                src="https://img.freepik.com/free-vector/success-businessman-abstract-business-vector-illustration-template_460848-13495.jpg"
                className={register.img1}
                alt="img "
              />

         
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">

                  <span className="h1 fw-bold mb-0">Customer setup</span>
                </div>


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
             
               
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default CustomerSup