
import React from "react";
// import { SkrillPayment } from "./SkrillPayment/SkrillPayment";
import { useState } from "react";
import payment from "./seller.module.css";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

 const SellerPayment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleCustomerLogin = () => {
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
//   \\
  const [selectedValue, setSelectedValue] = useState("");

  function handleChange(event) {
    setSelectedValue(event.target.value);
    if (event.target.value !== "") {
      window.location.href = event.target.value;
    }
  }


  return (
    <div>
      <MDBContainer className={payment.header}>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img src="../Image/image5.jpeg" className={payment.img1} alt=""/>
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


                <div className="form-group my-3">
                  <label for="state">Preferred Payment Method</label>

                  <select 
                  className="form-control" 
                  id="state"
                  placeholder="payment option"
                  value={selectedValue} onChange={handleChange}
                   >
                    {" "}
                 
                  
                      <option value="/bank"> Bank Transfer</option>
                  </select>
              
                </div>

                {emailError && <div className="text-danger">{emailError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="PayPal Email"
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
                  <Link to="/customer">Continue</Link>
                </button>
                <button
                  className="btn btn-dark"
                  color="dark"
                  size="lg"
                  onClick={handleCustomerLogin}
                >
                  <Link to="/customer">Skip</Link>
                </button>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
export default SellerPayment