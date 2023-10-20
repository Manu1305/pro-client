import React, { useState } from "react";
import register from "./Store.module.css";
import { useSelector } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol, 
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

 const Store = () => {
  const user = useSelector((state)=> state.userReducer.user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopURL, setShopURL] = useState("    ");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [nameError, setNameError] = useState("");
  const [logoError, setLogoError] = useState(null);
  const [bannerError, setBannerError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [shopNameError, setShopNameError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedState, setSelectedState] = useState("");

 

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLogoUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; 

    // Check if a file is selected
    if (!file) {
      setLogoError("Please select a file.");
      return;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setLogoError("Only JPEG and PNG file types are allowed.");
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      setLogoError("File size exceeds the limit of 5MB.");
      return;
    }

    setLogoError(""); //
  };

  const handleBannerUpload = (e) => {};

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
  };

  const handleCustomerLogin = () => {
    // Perform login logic using email and password
    const isValid = validate();
    
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
      passwordError = "Need 6 letter minimum";
    }

    if (!confirmpassword) {
      confirmpasswordError = "please confirm the password";
    } else if (password != confirmpassword) {
      confirmpasswordError = "Password do not match";
    }

    if (!phone) {
      phoneError = "Please type your phone";
    } else if (phone.length < 10 && phone.length > 10) {
      phoneError = "Please type 10 digit phone number";
    }
    if (!name) {
      nameError = "Please type your full name";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      nameError = "Please enter a valid full name 😊";
    }
    if (!shopName) {
      shopNameError = "Please type your shop name";
    }
    if (!address1) {
      address1Error = "Please type you adress ";
    } else if (address1.length < 3) {
      address1Error = "need more than 3 letters";
    }
    if (!city) {
      cityError = "Please type your City";
    }
    if (!pincode) {
      pincodeError = "Please type your pin";
    } else if (phone.length < 6 && phone.length > 6) {
      pincodeError = "Please type correct zip code";
    }

    setNameError(nameError);
    setEmailError(emailError);
    setNameError(nameError);
    setPhoneError(phoneError);
    setShopNameError(shopNameError);
    setAddress1Error(address1Error);
    setCityError(cityError);
    setPincodeError(pincodeError);

    if (
      emailError ||
      passwordError ||
      confirmpasswordError ||
      phoneError ||
      nameError ||
      shopNameError ||
      cityError
    ) {
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
              <img
                src="https://cdn.dribbble.com/users/836931/screenshots/3004436/retail.gif"
                className={register.img1}
                alt="s"
              />

            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  {/* <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} /> */}

                  <span className="h1 fw-bold mb-0">Store setup</span>
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                  
                ></h5>
                {/* {nameError && <div className="text-danger">{nameError}</div>} */}
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Name
                  </label>
                  <div className="w-85">
                    <MDBInput
                      id="formControlLg"
                      type="text"
                      size="lg"
                      value={user.name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <div className="text-danger">{nameError}</div>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <label htmlFor="logoInput" className="form-label me-3 w-25">
                    Logo image upload
                  </label>
                  <input
                    id="logoInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e.target.files[0])}
                    className="w-85"
                  />
                  {logoError && <div className="text-danger">{logoError}</div>}
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="bannerUpload"
                    className="form-label me-3 w-25"
                  >
                    Banner Image Upload
                  </label>
                  <input
                    id="bannerUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleBannerUpload(e)}
                    className="w-85"
                  />
                  {bannerError && (
                    <div className="text-danger">{bannerError}</div>
                  )}
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
                    // onChange={(e) => setEmail(e.target.value)}
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
                    value={user.phone}
                    // onChange={(e) => setPhone(e.target.value)}
                    className="w-85"
                  />
                  {phoneError && (
                    <div className="text-danger">{phoneError}</div>
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
                    value={user.shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="85"
                  />
                  {shopNameError && (
                    <div className="text-danger">{shopNameError}</div>
                  )}
                </div>
            
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                   locality & House No.
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.locality}
                    // onChange={(e) => setAddress1(e.target.value)}
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
                     area
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.area}
                    // onChange={(e) => setAddress2(e.target.value)}
                    className="w-85"
                  />
                </div>          
                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Country{" "}
                  </label>
                  <MDBInput
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={user.address.country}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-85"
                  />
                  {cityError && <div className="text-danger">{cityError}</div>}
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
                    onChange={(e) => setCity(e.target.value)}
                    className="w-85"
                  />
                  {cityError && <div className="text-danger">{cityError}</div>}
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
                    onChange={(e) => setCity(e.target.value)}
                    className="w-85"
                  />
                  {cityError && <div className="text-danger">{cityError}</div>}
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
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-85"
                  />
                  {pincodeError && (
                    <div className="text-danger">{pincodeError}</div>
                  )}
                </div>


                <div className="d-flex flex-row align-items-center mb-4">
                  <label
                    htmlFor="formControlLg"
                    className="form-label me-3 w-25"
                  >
                    Shop Description
                  </label>
                  <div className="w-75">
                    <textarea
                      id="formControlLg"
                      className="form-control form-control-lg"
                      rows="4"
                      value={description}
                      onChange={handleDescriptionChange}
                    ></textarea>
                    {descriptionError && (
                      <div className="text-danger">{descriptionError}</div>
                    )}
                  </div>
                </div>

                <button
                  className="btn btn-warning my-2  "
                  color="dark"
                  size="lg"
                  onClick={handleCustomerLogin}
                >
                  Submit
                </button>
            
           
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Store