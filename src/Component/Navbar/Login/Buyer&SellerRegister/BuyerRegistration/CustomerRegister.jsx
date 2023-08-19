import React from "react";
import register from "../Register.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

const CustomerRegister = () => {
   const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [urType, setUrType] = useState("buyer");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  
  const [phoneError, setPhoneError] = useState("");



  async function handleCustomerSignup(e) {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      try {
        await httpService
          .post(`${apiURL}/user/signup`, {
            userData: { name, email, password, phone, gst, urType: "buyer" }})
          .then((res) => {
            
            console.log(res)
            if (res.data.message=="emailexist") {
              Swal.fire({
                icon: 'error',
                title: 'Email already registered',
               
                footer: '<a href="/login">Go to Login page</a>'
              })
            } 
             else if (res.data.message == "Phonexist") {
               Swal.fire({
                 icon: "error",
                 title: "this phone already registered",

                 footer: '<a href="/login">Go to Login page</a>',
               });
             } else if (res.data.message == "success") {
               history("/login");
             }
          });
    
      } catch (error) {
        console.log("Registration failed:", error);
        // Handle error, e.g., show an error message
      }
    } else {
      console.log("Form validation failed!");
    }
  }

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    let confirmpasswordError = "";
    let phoneError = "";
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

    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    }

    if (!confirmpassword) {
      confirmpasswordError = "please confirm the password";
    } else if (password != confirmpassword) {
      confirmpasswordError = "Password do not match";
    }

    if (!phone) {
      phoneError = "Please type your phone";
    } else if (phone.length < 10 && phone.length < 10) {
      phoneError = "Please type 10 digit phone number";
    }
    if (!name) {
      nameError = "Please type your full name";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      nameError = "Please enter a valid full name 😊";
    }
  

    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setNameError(nameError);
    setConfirmPasswordError(confirmpasswordError);
    setPhoneError(phoneError);



    if (
      emailError ||
      passwordError ||
      confirmpasswordError ||
      phoneError ||
      nameError
    ) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <MDBContainer>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img src="https://e1.pxfuel.com/desktop-wallpaper/344/686/desktop-wallpaper-european-and-american-trend-fashion-clothing-shop-industrial-decor-backgrounds-3d-teen-clothing-store-wall-paper-murals.jpg" className={register.img1} />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0">HitecMart</span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Register as Customer
                </h5>
                {nameError && <div className="text-danger">{nameError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Full name"
                  id="formControlLg"
                  type="string"
                  size="lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {emailError && <div className="text-danger">{emailError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="string"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="string"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {confirmpasswordError && (
  <div className="text-danger">{confirmpasswordError}</div>
)}
                <MDBInput
  wrapperclassName="mb-4"
  label="Confirm Password"
  id="formControlLg"
  type="password"
  size="lg"
  value={confirmpassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>


                {phoneError && <div className="text-danger">{phoneError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Phone No."
                  id="formControlLg"
                  type="number"
                  size="lg"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                  
                <MDBInput
                  wrapperclassName="mb-4"
                  label="GST No."
                  id="formControlLg"
                  type="string"
                  size="lg"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                />
                   
                <button
                  className="btn btn-dark"
                  color="dark"
                  size="lg"
                  onClick={handleCustomerSignup}
                >
                  Register
                </button>
                
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#393f81" }}>
                    login here
                  </Link>
                </p>
                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};



export default CustomerRegister;