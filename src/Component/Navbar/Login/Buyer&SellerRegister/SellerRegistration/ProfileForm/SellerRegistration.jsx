import React from "react";
import { useState } from "react";
import register from "../../Register.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addSeller,
  saveSellerData,
} from "../../../../../../Redux/user/userAction";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Dropdown } from "react-bootstrap";
import { useEffect } from "react";
import httpService from "../../../../../Error Handling/httpService";
import { apiURL } from "../../../../../../const/config";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const SellerRegister = () => {
  // const history = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const [phoneOtp, setPhoneOtp] = useState("");
  const [Afterotp, setAfterotp] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [GstError, setGstError] = useState("");
  const [otpError, setOtperror] = useState("");
  const [userFilledData, setUserFilledData] = useState({});
  const [inpType, setInpType] = useState("password");
  const [inpTypeConf, setInpTypeConf] = useState("password");
  const [userType, setUsertype] = "Seller registration";
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  const countries = ["India", "Australia", "Srilanka"];
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
    // Add more countries and states as needed
  };
  const [showButton, setShowButton] = useState(true);
const [add, setAdd]= useState(null)
  const navigate = useNavigate();


  const getAddress = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const { latitude, longitude } = pos.coords;
      console.log('Got latitude and longitude:', latitude, longitude);
      
      // Return latitude and longitude
      return { latitude, longitude };
    } catch (error) {
      console.error("Error getting address:", error);
      // Return an object with null values or handle the error as needed
      return { latitude: null, longitude: null };
    }
  };
  
  const handleCustomerLogin = async (e) => {
    const isValid = validate();
  
    console.log(isValid);
    if (isValid) {
      console.log("Clicked");
      e.preventDefault();
  
      // Call the getAddress function to get the address and latitude/longitude
      const { latitude, longitude } = await getAddress();
  
      if (latitude !== null && longitude !== null) {
        console.log('Received latitude and longitude:', latitude, longitude);
        
        dispatch(
          saveSellerData({
            name: userFilledData.name,
            email: userFilledData.email,
            phone: userFilledData.phone,
            password: userFilledData.password,
            gst: userFilledData.gst,
            "full name": userFilledData["full name"],
            urType: "seller",
            address: {
              locality: userFilledData.locality,
              area: userFilledData.area,
              city: userFilledData.city,
              country: userFilledData.country,
              state: userFilledData.state,
              pincode: userFilledData.pincode,
            },
            shopName: userFilledData.shopName,
            latitude, // Include latitude in the data
            longitude, // Include longitude in the data
          })
        );
  
        navigate("/sellerplans");
      } else {
        console.log('Failed to receive latitude and longitude');
        // Handle the case where latitude and longitude are not available
      }
    } else {
      toast.error("Please fill in all fields");
      console.log("Validation function has returned false...");
    }
  };
  

  
  
  
  
  


  // const handleCustomerLogin = (e) => {
  //   const isValid = validate();

  //   console.log(isValid);
  //   if (isValid) {
  //     console.log("Clicked");
  //     e.preventDefault();
  //     dispatch(
  //       saveSellerData({
  //         name: userFilledData.name,
  //         email: userFilledData.email,
  //         phone: userFilledData.phone,

  //         password: userFilledData.password,
  //         gst: userFilledData.gst,
  //         "full name": userFilledData["full name"],
  //         urType: "seller",
  //         address: {
  //           locality: userFilledData.locality,
  //           area: userFilledData.area,
  //           city: userFilledData.city,
  //           country: userFilledData.country,
  //           state: userFilledData.state,
  //           pincode: userFilledData.pincode,
  //         },
  //         shopName: userFilledData.shopName,
  //       })
  //     );

  //     navigate("/sellerplans");
  //   } else {
  //     toast.error("Please fill the all field ");
  //     console.log("Valid function has return false...");
  //   }
  // };

  //longitude & latitude

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       },
  //       function (error) {
  //         console.error("Error getting geolocation:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by your browser");
  //   }
  // }, []);

  // const getAddress=()=> {
  //   navigator.geolocation.getCurrentPosition(async(pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     console.log(latitude, longitude);
  //     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  //     await fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => setAdd(data.address)
       
  //       );
  //     console.log(add, "dfcdfk");
  //   });
    
  // }

  useEffect(() => {
    console.log("Check", userFilledData);
    setPhone(userFilledData.phone);
  }, [userFilledData]);

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

  const sendOtp = () => {
    if (phone.length == 10) {
      toast.success("otp sended successfuly");
      setShowButton(false);
      httpService
        .post(`${apiURL}/user/send-otp`, { phone, userType })
        .then((response) => {
          console.log(response.data + "this is data");
        })

        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        setShowButton(true);
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
        if (response.data.message == "success") {
          setAfterotp(true);
          setOtperror("");
        } else if (response.data.message == "failed") {
          setAfterotp(false);
          setOtperror("Wrong otp");
        } else if (response.data.message == "failed") {
          setAfterotp(false);
          setOtperror("Wrong otp");
        } else {
          setAfterotp(false);
          setOtperror("Wrong otp");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePhoneOtpChange = (e) => {
    setPhoneOtp(e.target.value);
    setAfterotp(e.target.value === "111113");
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    let confirmpasswordError = "";
    let phoneError = "";
    let nameError = "";
    let shopNameError = "";
    let address1Error = "";
    let cityError = "";
    let pincodeError = "";
    let gstError = "";
    let otpError = "";

    if (!userFilledData.name) {
      nameError = " Name is required";
    } else if (!/\S+@\S+\.\S+/.test(userFilledData.email)) {
      emailError = "Email address is invalid";
    }
    if (!userFilledData.email) {
      emailError = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(userFilledData.email)) {
      emailError = "Email address is invalid";
    }

    if (!userFilledData.password) {
      passwordError = "Password is required";
    } else if (userFilledData.password.length < 6) {
      passwordError = "Need 6 letter minimum";
    }

    if (!userFilledData.confirmPassword) {
      confirmpasswordError = "please confirm the password";
    } else if (userFilledData.password != userFilledData.confirmPassword) {
      confirmpasswordError = "Password do not match";
    }

    if (!userFilledData.phone) {
      phoneError = "Please type your phone";
    } else if (
      userFilledData.phone.length < 10 &&
      userFilledData.phone.length > 10
    ) {
      phoneError = "Please type 10 digit phone number";
    }

    if (!userFilledData.shopName) {
      shopNameError = "Please type your shop name";
    }
    if (!userFilledData.address1) {
      address1Error = "Please type you adress ";
    } else if (userFilledData.address1.length < 3) {
      address1Error = "need more than 3 letters";
    }
    if (!userFilledData.city) {
      cityError = "Please type your City";
    }
    if (!userFilledData.pincode) {
      pincodeError = "Please type your pin";
    } else if (
      userFilledData.pincode.length < 6 &&
      userFilledData.pincode.length > 6
    ) {
      pincodeError = "Please type correct zip code";
    }
    if (!userFilledData.gst) {
      gstError = "please type the gst number";
    } else if (
      userFilledData.gst.length < 15 &&
      userFilledData.gst.length > 15
    ) {
      phoneError = "Please type Valid 15 digit gst Number";
    }

    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setNameError(nameError);
    setConfirmPasswordError(confirmpasswordError);
    setPhoneError(phoneError);
    setShopNameError(shopNameError);
    // setAddress1Error(address1Error);
    setCityError(cityError);
    setPincodeError(pincodeError);
    setGstError(gstError);

    if (
      emailError ||
      passwordError ||
      confirmpasswordError ||
      phoneError ||
      nameError ||
      shopNameError ||
      cityError ||
      gstError ||
      pincodeError ||
      shopNameError 
      // address1Error
    ) {
      return false;
    }

    return true;
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;

    setUserFilledData((prev) => {
      return { ...prev, [name]: value, add };
    });
  };

  useEffect(() => {
    console.log(userFilledData);
    // console.log("shsh")

    if (userFilledData.phoneOtp == 12345) setAfterotp(true);
  }, [userFilledData]);

  return (
    <div>
      <MDBContainer>
        <MDBCard>
          <MDBRow className="g-0">
            {/* {userData.map((data)=>{
            return( */}
            <div>
              <div>
                <MDBCol md="6">
                  <MDBCardBody className="d-flex flex-column">
                    <div className="d-flex flex-row mt-2">
                      <span className="h1 fw-bold mb-0">HitecMart</span>
                    </div>
                    <div className="flex flex-row">
                      
                    <h5
                      className="fw-normal my-4 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Register as seller
                    </h5>
                    {/* <button className="bg-red-600 border"> allow location </button> */}

                    </div>
                    {/* {nameError && <div className="text-danger">{nameError}</div>} */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <label
                        htmlFor="formControlLg"
                        className="form-label me-3 w-25"
                      >
                        UserName
                      </label>
                      <div className="w-85">
                        <MDBInput
                          id="formControlLg"
                          type="text"
                          size="lg"
                          name="name"
                          // value={userData.username}
                          onChange={onchangeHandler}
                        />
                        {nameError && (
                          <div className="text-danger">{nameError}</div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <label
                        htmlFor="formControlLg"
                        className="form-label me-3 w-25"
                      >
                        Email address.
                      </label>
                      <MDBInput
                        id="formControlLg"
                        type="email"
                        size="lg"
                        name="email"
                        // value={userData.email}
                        onChange={onchangeHandler}
                        className="w-85"
                      />
                      {emailError && (
                        <div className="text-danger">{emailError}</div>
                      )}
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
                        name="phone"
                        // value={userData.phone}
                        onChange={onchangeHandler}
                        className="w-85"
                      />{" "}
                      {showButton && (
                        <button
                          className="btn btn-link bg-warning text-dark"
                          onClick={sendOtp}
                        >
                          Send OTP
                        </button>
                      )}
                      {phoneError && (
                        <div className="text-danger">{phoneError}</div>
                      )}
                    </div>

                    {/* <button onClick={verifyOtp}>Submit otp</button> */}
                    {otpError && <div className="text-danger">{otpError}</div>}

                    <div></div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <label
                        htmlFor="formControlLg"
                        className="form-label me-3 w-25"
                      >
                        OTP
                      </label>
                      <MDBInput
                        id="formControlLg"
                        type="text"
                        size="lg"
                        name="phoneOtp"
                        // value={userData.phoneOtp}
                        onChange={handlePhoneOtpChange}
                        className="w-75"
                      />
                      <button
                        className="btn btn-link bg-warning text-dark"
                        onClick={verifyOtp}
                      >
                        Submit OTP
                      </button>
                    </div>

                    {Afterotp && (
                      <div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <label
                            htmlFor="formControlLg"
                            className="form-label me-3 w-25"
                          >
                            Gst number.
                          </label>
                          <MDBInput
                            id="formControlLg"
                            type="email"
                            size="lg"
                            name="gst"
                            // value={userData.gst}
                            onChange={onchangeHandler}
                            className="w-85"
                          />
                          {GstError && (
                            <div className="text-danger">{GstError}</div>
                          )}
                        </div>







                        













                        <div className="d-flex flex-row align-items-center mb-4">
                          <label
                            htmlFor="formControlLg"
                            className="form-label me-3 w-25"
                          >
                            Shop Name
                          </label>
                          <MDBInput
                            id="formControlLg"
                            type="text"
                            size="lg"
                            name="shopName"
                            onChange={onchangeHandler}
                            className="85"
                          />
                          {shopNameError && (
                            <div className="text-danger">{shopNameError}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </div>
              <div>
                <MDBCol md="6">
                  <MDBCardBody className="d-flex flex-column">
                    {Afterotp && (
                      <div>
                        <hr></hr>
                        <div>
                          <label
                            htmlFor="formControlLg"
                            className="form-label me-3 w-25"
                          >
                            Address :
                          </label>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label
                              htmlFor="formControlLg"
                              className="form-label me-3 w-25"
                            >
                              House No. or Locality
                            </label>
                            <MDBInput
                              id="formControlLg"
                              type="text"
                              size="lg"
                              name="locality"
                              onChange={onchangeHandler}
                              className="w-85"
                            />
                            {address1Error && (
                              <div className="text-danger">{address1Error}</div>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label
                              htmlFor="formControlLg"
                              className="form-label me-3 w-25"
                            >
                              Area & Streat
                            </label>
                            <MDBInput
                              id="formControlLg"
                              type="text"
                              size="lg"
                              name="area"
                              onChange={onchangeHandler}
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
                            <Dropdown>
                              <Dropdown.Toggle
                                id="formControlLg"
                                size="lg"
                                className="w-85 bg-warning"
                              >
                                {userFilledData.country || "select a country"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {countries.map((country, index) => (
                                  <Dropdown.Item
                                    key={index}
                                    onClick={() =>
                                      setUserFilledData((prev) => {
                                        return {
                                          ...prev,
                                          ["country"]: country,
                                        };
                                      })
                                    }
                                  >
                                    {country}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <label
                              htmlFor="formControlLg"
                              className="form-label me-3 w-25"
                            >
                              State
                            </label>
                            <Dropdown>
                              <Dropdown.Toggle
                                id="stateDropdown"
                                size="lg"
                                className="w-85 bg-warning"
                              >
                                {userFilledData.state || "Select State"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu
                                style={{
                                  maxHeight: "200px",
                                  overflowY: "auto",
                                }}
                              >
                                {userFilledData.country &&
                                  stateData[userFilledData.country]?.map(
                                    (state, index) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          setUserFilledData((prev) => {
                                            return {
                                              ...prev,
                                              ["state"]: state,
                                            };
                                          })
                                        }
                                      >
                                        {state}
                                      </Dropdown.Item>
                                    )
                                  )}
                              </Dropdown.Menu>
                            </Dropdown>
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
                              name="city"
                              onChange={onchangeHandler}
                              className="w-85"
                            />
                            {cityError && (
                              <div className="text-danger">{cityError}</div>
                            )}
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
                              name="pincode"
                              onChange={onchangeHandler}
                              className="w-85"
                            />
                            {pincodeError && (
                              <div className="text-danger">{pincodeError}</div>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <label
                            htmlFor="formControlLg"
                            className="form-label me-3 w-25"
                          >
                            Password
                          </label>
                          <MDBInput
                            id="formControlLg"
                            type={inpType}
                            size="lg"
                            name="password"
                            onChange={onchangeHandler}
                            className="w-85"
                          />

                          <span
                            className="flex justify-around items-center"
                            onClick={handleCheckPass}
                          >
                            {inpType === "password" ? (
                              <RemoveRedEyeIcon className="absolute mr-10" />
                            ) : (
                              <VisibilityOffIcon className="absolute mr-10" />
                            )}
                          </span>
                          {passwordError && (
                            <div className="text-danger">{passwordError}</div>
                          )}
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <label
                            htmlFor="formControlLg"
                            className="form-label me-3 w-25"
                          >
                            Confirm Password
                          </label>
                          <MDBInput
                            id="formControlLg"
                            type={inpTypeConf}
                            size="lg"
                            name="confirmPassword"
                            onChange={onchangeHandler}
                            className="w-85"
                          />
                          <span
                            className="flex justify-around items-center"
                            onClick={handleCheckPassConf}
                          >
                            {inpTypeConf === "password" ? (
                              <RemoveRedEyeIcon className="absolute mr-10" />
                            ) : (
                              <VisibilityOffIcon className="absolute mr-10" />
                            )}
                          </span>
                          {confirmpasswordError && (
                            <div className="text-danger">
                              {confirmpasswordError}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row">
                          <p className="small text-muted">
                            By register, you accept Hitecmart's{" "}
                            <Link
                              to="/sellerTermAndCond"
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
                          className="btn btn-dark mt-3 "
                          color="dark"
                          size="lg"
                          onClick={handleCustomerLogin}
                        >
                          Registration
                        </button>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Already have an account?{" "}
                          <Link to="/login" style={{ color: "#393f81" }}>
                            login here
                          </Link>
                        </p>
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </div>
            </div>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
export default SellerRegister;
