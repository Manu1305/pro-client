import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "./login.module.css";
import { useState, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../../Redux/user/userAction";
import Swal from "sweetalert2";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";
const CustomerLogin = () => {
  const history = useNavigate();
  const localStorage = window.localStorage;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const pandaRef = useRef(null);


  const handleCustomerLogin = async (e) => {
    e.preventDefault();

    const isValid = validate();

    try {
      const response = await httpService
        .post(`${apiURL}/user/login`, { email, password })
        .then((res) => res)
        .catch((err) => {
          console.log(err);

          if (err.response.data.message === "User not exist") {
            Swal.fire({
              icon: "error",
              title: "User not signed up",
              text: "Please create account ",
              footer: '<a href="/register">create Account?</a>',
            });
          } else if (err.response.data.message === "incorrect") {
            Swal.fire(
              "Incorrect Password",
              "Please check your password",
              "warning"
            );
          }
        });
      if (response && response.data && response.data.user)
        dispatch(addUser(response.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const route =
          response.data.user.urType === "seller"
            ? !response.data.user?.storeSetup ? "/StorePage" : '/dashboard'
            : `/Profilepage/${email}`;
        history(route, {
          state: {
            id: email,
            name: response.data.name,
          },
        });
      }
    } catch (error) {
      // alert("Wrong details: " + error);
      console.log(error);
    }

    if (isValid) {
      //   Perform login logic using email and password
      // console.log("Email:", email);
      // console.log("Password:", password);
    }
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

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

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (emailError || passwordError) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <div ref={pandaRef} className={login.pandaImage}></div>
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0">Customer</span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>
                {emailError && <div className="text-danger">{emailError}</div>}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
                <MDBInput
                  wrapperclassName="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError}
                />

                <button
                  className="btn btn-dark"
                  color="dark"
                  size="lg"
                  onClick={handleCustomerLogin}
                >
                  Login
                </button>
                <Link className="small text-muted" to="/passwordupdate">
                  Forgot password?
                </Link>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
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
export default CustomerLogin;
