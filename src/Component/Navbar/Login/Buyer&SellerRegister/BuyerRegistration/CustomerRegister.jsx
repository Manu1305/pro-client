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
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomerRegister = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [button, setButton] = useState(true);
  const [otpbutton, setotpButton] = useState(false);
  const [userType, setUsertype] = "customer";
  const [inpType, setInpType] = useState("password");
  const [inpTypeConf, setInpTypeConf] = useState("password");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState(false);
  async function handleCustomerSignup(e) {
    e.preventDefault();

    const isValid = validate();
    if (isValid ) {
      try {
        await httpService
          .post(`${apiURL}/user/signup`, {
            userData: { name, email, password, phone, gst, urType: "buyer" },
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
              setButton(true);
            } else if (res.data.message == "success") {
              history("/login");
            }
          });
      } catch (error) {
        console.log("Registration failed:", error);
        toast.error("otp validation failed");
        // Handle error, e.g., show an error message
      }
    } else {
      console.log("Form validation failed!");
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const sendOtp = () => {
    if (phone.length === 10) {
      toast.success("otp sended successfuly");
      setotpButton(true);
      httpService
        .post(`${apiURL}/user/send-otp`, { phone, userType })
        .then((response) => {
          console.log(response.data + "this is data");
        })

        .catch((error) => {
          console.error(error);
          toast.error("otp not sended", error);
        });
      setTimeout(() => {}, 20000);
    } else {
      alert("phone number should 10");
    }
  };

  const handleCheckPass = () => {
    if (inpType === "password") {
      setInpType("text");
    } else {
      setInpType("password");
    }
  };
  const handleCheckPassConf = () => {
    if (inpTypeConf === "password") {
      setInpTypeConf("text");
    } else {
      setInpTypeConf("password");
    }
  };

  const verifyOtp = () => {
    httpService
      .post(`${apiURL}/user/verify-otp`, { phoneOtp })
      .then((response) => {
        console.log(response.data + "otp response");
        if (response.data.message == "success") {
          toast.success("otp succesfully verified");
          setButton(false);
        } else {
          toast.error("wrong otp ");
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
    let otpError = "";

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

    if (button === true) {
      otpError = "please verify phone number with otp";
    }

    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setNameError(nameError);
    setConfirmPasswordError(confirmpasswordError);
    setPhoneError(phoneError);
    setOtpError(otpError);
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

                  <OutlinedInput
                    className="w-full"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
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

                  <OutlinedInput
                    className="w-full"
                    id="outlined-adornment-password"
                    type={showPassword1 ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {phoneError && <div className="text-danger">{phoneError}</div>}

                <div>
                  <div className="mb-4" style={{ width: "90%" }}>
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
                      <button
                        className="rounded bg-green-500 w-20"
                        onClick={sendOtp}
                      >
                        Send otp
                      </button>
                    </div>
                  </div>

                  <div className="mb-4" style={{ width: "40%" }}>
                    {otpError && <div className="text-danger">{otpError}</div>}
                    {otpbutton && (
                      <div>
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
                          {button && (
                            <button
                              className="rounded bg-green-500 w-20"
                              onClick={verifyOtp}
                            >
                              verify
                            </button>
                          )}
                        </div>
                      </div>
                    )}
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
                <div className="flex flex-row">
                  <p className="small text-muted">
                    By register, you accept Hitecmart's{" "}
                    <Link
                      to="/termsCond"
                      className="text-blue-400 font-semibold"
                    >
                      terms{" "}
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacyPol"
                      className="text-blue-400 font-semibold"
                    >
                      {" "}
                      privacy policy{" "}
                    </Link>
                  </p>
                </div>
                <button
                  className="btn btn-dark mt-3"
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
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default CustomerRegister;
