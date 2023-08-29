import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserData } from "../../../../Redux/user/userAction";
import Swal from "sweetalert2";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";


const CustomerLogin = () => {
  const history = useNavigate();
  const localStorage = window.localStorage;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleCustomerLogin = async (e) => {
    e.preventDefault();


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



      if (response && response.data && response.data.user) {

        console.log("CHECK", response.data.user)
        dispatch(currentUserData(response.data.user));
        // sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }



      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const route =
          response.data.user.urType === "seller"
            ? !response.data.user?.storeSetup
              ? "/StorePage"
              : "/dashboard"
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

    
  };

  return (
    <section
      className="vh-90"
      style={{ "background-color": "rgb(191,10,41)" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ "border-radius": "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?size=626&ext=jpg&ga=GA1.2.1301076806.1687760879&semt=ais"
                    alt="login form"
                    className="img-fluid"
                    style={{ "border-radius": "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">

                        <i
                          className="fas fa-face-smile fa-2x me-3"
                          style={{ color: "red" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Login</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ "letter-spacing": "1px" }}
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example17">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          // error={emailError}
                          placeholder="please enter your email address..."
                        />

                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          // error={passwordError}
                          placeholder="please enter your password..."
                        />

                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block bg-dark"
                          // type="button"
                          onClick={handleCustomerLogin}
                        >
                          Login
                        </button>
                      </div>
                      <Link className="small text-muted" to="/passwordupdate">
                        Forgot password?
                      </Link>{" "}
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#393f81" }}>
                          Register here
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CustomerLogin;
