// import React from "react";
// import payment from "./seller.module.css"
// export const SellerPayment=()=>{
//     return(

//         <div className="container">
//          <h2 className={payment.header}>Payment setup</h2>
//     <form>

//       <div className="form-group">
//         <label for="state">Preferred Payment Method</label>
//         <select className="form-control" id="state">
//           <option>PayPal</option>
//           <option>Skrill</option>
//           <option>Bank Transfer</option>

//         </select>
//       </div>

//       <div className="form-group">
//         <label for="image">PayPal Email</label>
//         <input type="email" className="form-control" id="email" placeholder="PayPal Email"/>
//       </div>
//       <button type="submit" className="btn btn-primary">Submit</button>
//       <button type="submit" className="btn btn-dark">Submit</button>

//     </form>
//   </div>

//     )
// }
import React from "react";
import { useState } from "react";
import skrill from "./skrillPay.module.css";
import { Link } from "react-router-dom";
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

export const SkrillPayment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleCustomerLogin = () => {
    // Perform login logic using email and password
    const isValid = validate();
  
  };
  const validate = () => {
    let emailError = "";

    let nameError = "";

    if (!name) {
      nameError = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email address is invalid";
    }
    if (!email) {
      emailError = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email address is invalid";
    }

    setNameError(nameError);
    setEmailError(emailError);

    if (emailError || nameError) {
      return false;
    }

    return true;
  };
// \
const [selectedValue, setSelectedValue] = useState("");

function handleChange(event) {
  setSelectedValue(event.target.value);
  if (event.target.value !== "") {
    window.location.href = event.target.value;
  }
}

  return (
    <div>
      <MDBContainer className={skrill.header}>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img src="../Image/image2.jpeg" className={skrill.img1} />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}

                  <span className="h1 fw-bold mb-0">HitecMart</span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  payment Setup{" "}
                </h5>
                {/* {nameError && <div className="text-danger">{nameError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Full name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                /> */}

                <div className="form-group my-3">
                  <label for="state">Preferred Payment Method</label>

                  <select 
                  className="form-control" 
                  id="state"
                   placeholder="payment option"
                   value={selectedValue}
                    onChange={handleChange}>
                    {" "}
                    <option >Skrill</option>
                    <option value="/payment">Paypal</option>
                    <option value="/bank">Bank Transfer</option>
                  </select>
                </div>

                {emailError && <div className="text-danger">{emailError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Skrill Email"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="btn btn-warning my-2"
                  color="dark"
                  size="lg"
                  onClick={handleCustomerLogin}
                >
                  <Link to="CustomerSup">Continue</Link>
                </button>
                <button
                  className="btn btn-dark"
                  color="dark"
                  size="lg"
                  onClick={handleCustomerLogin}
                >
                  <Link to="*">Skip</Link>
                </button>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
