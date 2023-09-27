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
import { toast } from "react-toastify";


const CustomerRegister = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [urType, setUrType] = useState("buyer");
  const [phoneOtp,setPhoneOtp]=useState('')
const [button,setButton]=useState(true)






  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const[otpError,setOtpError]=useState(false)
  async function handleCustomerSignup(e) {
    e.preventDefault();

    const isValid = validate();
    if (isValid ) {
      try {
        await httpService
          .post(`${apiURL}/user/signup`, {
            userData: { name, email, password, phone, gst, urType: "buyer"},
          })
          .then((res) => {
            console.log(res);
            if (res.data.message == "emailexist") {
              Swal.fire({
                icon: "error",
                title: "Email already registered",

                footer: '<a href="/login">Go to Login page</a>',
              });
            } else if (res.data.message == "Phonexist") {
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
        toast.error("otp validation failed")
        // Handle error, e.g., show an error message
      }
    } else {
      console.log("Form validation failed!");
    }
  }

  const sendOtp = () => {
    if (phone.length == 10) {
      
      toast.success("otp sended successfuly");
      httpService
        .post(`${apiURL}/user/send-otp`, { phone })
        .then((response) => {
         
          console.log(response.data + "this is data")
        })

        .catch((error) => {
          console.error(error);
          toast.error("otp not sended",error);
        });
      setTimeout(() => {
       
      }, 20000);
    } else {
      alert("phone number should 10");
    }
  };

  const verifyOtp = () => {
    httpService
      .post(`${apiURL}/user/verify-otp`, { phone, phoneOtp })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "approved") {
          toast.success("otp verified")
          setButton(!button)


          
        } else {
          toast.error("wrong otp ")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };




  const validate = () => {
    let emailError = "";
    let passwordError = "";
    let confirmpasswordError = "";
    let phoneError = "";
    let nameError = "";
    let otpError=""
    

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

    if (button===true) {
      otpError = "please verify phone number with otp";
    } 



    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setNameError(nameError);
    setConfirmPasswordError(confirmpasswordError);
    setPhoneError(phoneError);
    setOtpError(otpError)
    if (
      emailError ||
      passwordError ||
      confirmpasswordError ||
      phoneError ||
      nameError ||
      otpError
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
              <img
                src="https://img.freepik.com/free-vector/online-school-platform-abstract-concept-vector-illustration-homeschooling-covid2019-qarantine-online-education-platform-digital-classes-virtual-courses-lms-school-abstract-metaphor_335657-5850.jpg?w=740&t=st=1692789217~exp=1692789817~hmac=a0b139faac079ad1e25e5e690d35a0c444261aa1f2cacb1eddc3acad93aba0e2"
                alt="login"
                className={register.img1}
              />
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
                <div className="mb-4">
                  <label htmlFor="formControlLg" className="mb-1">
                    Full name 
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {emailError && <div className="text-danger">{emailError}</div>}
                <div className="mb-4">
                  <label htmlFor="emailFormControlLg" className="mb-1">
                    Email address
                  </label>
                  <MDBInput
                    id="emailFormControlLg"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
                <div className="mb-4">
                  <label htmlFor="passwordFormControlLg" className="mb-1">
                    Password
                  </label>
                  <MDBInput
                    id="passwordFormControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {confirmpasswordError && (
                  <div className="text-danger">{confirmpasswordError}</div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPasswordFormControlLg"
                    className="mb-1"
                  >
                    Confirm Password
                  </label>
                  <MDBInput
                    id="confirmPasswordFormControlLg"
                    type="password"
                    size="lg"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {phoneError && <div className="text-danger">{phoneError}</div>}
                <div className="mb-4" style={{width:'90%'}} >
                  <label htmlFor="phoneFormControlLg" className="mb-1">
                    Phone No.
                  </label>
                  
<div className="flex flex-row gap-3">
                  <MDBInput
                    id="phoneFormControlLg"
                    type="tel"
                    size="lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {
                    button&& (  <button className="rounded" onClick={sendOtp} >Send otp</button> )
                  }
                
  
</div>
                  </div>
               
                <div className="mb-4" style={{width:'40%'}}>
                {otpError && <div className="text-danger">{otpError}</div>}
                  <label htmlFor="phoneFormControlLg" className="mb-1">
                    OTP
                  </label>
                  <div className="flex flex-row gap-3">

                  <MDBInput
                    id="phoneFormControlLg"
                    type="tel"
                    size="lg"
                    value={phoneOtp}
                    onChange={(e) => setPhoneOtp(e.target.value)}
                  />
                  {
                    button&& ( <button className="rounded"  onClick={verifyOtp} >Submit</button>)
                  }
                 
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="gstFormControlLg" className="mb-1">
                    GST No.
                  </label>
                  <MDBInput
                    id="gstFormControlLg"
                    type="text"
                    size="lg"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                  />
                </div>

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
                  <a href="#!" className="small text-muted  ">
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
