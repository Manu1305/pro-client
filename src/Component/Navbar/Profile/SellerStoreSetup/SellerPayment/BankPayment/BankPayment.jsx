import React from "react";
import { useState } from "react";
import bank from "./BankPayment.module.css";
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
import Swal from "sweetalert2";
import { apiURL } from "../../../../../../const/config";
import httpService from "../../../../../Error Handling/httpService";
 const BankPayment = () => {
  const [bankName, setBankName] = useState("");
  const [AccountNumber, setAccountNumber] = useState();
  const [confirmAccountNumber, setconfirmAccountNumber] = useState();
  const [Name, setName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [Branch, setBranch] = useState("");
  const [banknameError, setbanknameError] = useState("");
  const [AccountNumberError, setAccountNumberError] = useState("");
  const [confirmAccountNumberError, setconfirmAccountNumberError] =
    useState("");
  const [nameError, setnameError] = useState("");
  const [ifscError, setifscError] = useState("");
  const [BranchError, setBranchError] = useState("");
  const handleBankAddress = async (e) => {
    const isValid = validate();
    if (isValid) {
      e.preventDefault();
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await httpService
          .post(
            `${apiURL}/Bankdetails/addBankData`,
            {
              bankName,
              AccountNumber,
              Name,
              ifsc,
              Branch,
            },
            config
          )
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
          });
     
        Swal.fire(
          'Bank details added successfully',
          'click next button for next step',
          'success'
        )
      } catch (error) {
        console.log(error);
        
      }
    } else {
     
    }
  };

  const [selectedValue, setSelectedValue] = useState("");

  function handleChange(event) {
    setSelectedValue(event.target.value);
    if (event.target.value !== "") {
      window.location.href = event.target.value;
    }
  }

  const bankNames = [
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Punjab National Bank (PNB)",
    "Bank of Baroda (BOB)",
    "Canara Bank",
    "Axis Bank",
    "Union Bank of India",
    "Bank of India (BOI)",
    "IDBI Bank",
    "Indian Bank",
    "Central Bank of India",
    "Kotak Mahindra Bank",
    "IndusInd Bank",
    "Yes Bank",
    "Federal Bank",
    "IDFC First Bank",
    "Punjab & Sind Bank",
    "South Indian Bank",
    "RBL Bank",
    "Bank of Maharashtra",
    "Karur Vysya Bank",
    "UCO Bank",
    "City Union Bank",
    "Lakshmi Vilas Bank",
    "Karnataka Bank",
    "Jammu and Kashmir Bank",
    "Andhra Bank",
    "Dena Bank",
    "Vijaya Bank",
    "Corporation Bank",
    "Indian Overseas Bank",
    "Catholic Syrian Bank",
    "Nainital Bank",
    "Syndicate Bank",
    "United Bank of India",
    "Allahabad Bank",
    "Oriental Bank of Commerce (OBC)",
    "Dhanlaxmi Bank",
    "Tamilnad Mercantile Bank (TMB)",
    "North East Small Finance Bank",
    "Equitas Small Finance Bank",
    "Ujjivan Small Finance Bank",
    "ESAF Small Finance Bank",
    "Bandhan Bank",
    "AU Small Finance Bank",
    "Fincare Small Finance Bank",
    "Jana Small Finance Bank",
    "Kotak Mahindra Bank",
    "Axis Bank",
  ];

  const validate = () => {
    let banknameError = "";
    let AccountNumberError = "";
    let confirmAccountNumberError = "";
    let nameError = "";
    let ifscError = "";
    let BranchError = "";

    if (!bankName) {
      banknameError = "Select your bank name";
    }
    if (!AccountNumber) {
      AccountNumberError = "Please type your account number";
    } else if (AccountNumber.length <= 8) {
      AccountNumberError = "type the account number Correctly";
    } else if (AccountNumber.length >= 17) {
      AccountNumberError = "type the account number Correctly";
    }
    if (!confirmAccountNumber) {
      confirmAccountNumberError = "Please type Accountnumber";
    } else if (confirmAccountNumber != AccountNumber) {
      confirmAccountNumberError = "Account number not matching";
    }
    if (!Name) {
      nameError = "Please type your Name connected with bank account";
    }
    if (!ifsc) {
      ifscError = "Please type your ifsc";
    } else if (ifsc.length <= 10 && ifsc.length >= 12) {
      ifscError = "Please type correct ifsc";
    }
    if (!Branch) {
      BranchError = " Type your branch name";
    }

    setbanknameError(banknameError);
    setAccountNumberError(AccountNumberError);
    setnameError(nameError);
    setBranchError(BranchError);
    setifscError(ifscError);
    setconfirmAccountNumberError(confirmAccountNumberError);

    if (
      banknameError ||
      AccountNumberError ||
      nameError ||
      BranchError ||
      ifscError
    ) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <MDBContainer className={bank.header}>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6"></MDBCol>
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
                {banknameError && (
                  <div className="text-danger">{banknameError}</div>
                )}
                <select
                  className="mb-4"
                  id="formControlLg"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value="">Select Bank</option>
                  {bankNames.map((bankName, index) => (
                    <option key={index} value={bankName}>
                      {bankName}
                    </option>
                  ))}
                </select>
                {BranchError && (
                  <div className="text-danger">{BranchError}</div>
                )}

                <MDBInput
                  wrapperclassName="mb-4"
                  label="Branch"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={Branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
                {nameError && <div className="text-danger">{nameError}</div>}

                <MDBInput
                  wrapperclassName="mb-4"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                {AccountNumberError && (
                  <div className="text-danger">{AccountNumberError}</div>
                )}

                <MDBInput
                  wrapperclassName="mb-4"
                  label="Account Number"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={AccountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                {confirmAccountNumberError && (
                  <div className="text-danger">{confirmAccountNumberError}</div>
                )}

                <MDBInput
                  wrapperclassName="mb-4"
                  label="confirm Account Number"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={confirmAccountNumber}
                  onChange={(e) => setconfirmAccountNumber(e.target.value)}
                />

                {ifscError && <div className="text-danger">{ifscError}</div>}

                <MDBInput
                  wrapperclassName="mb-4"
                  label="IFSC Code"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />

                <button
                  className="btn btn-warning my-2"
                  color="dark"
                  size="lg"
                  onClick={handleBankAddress}
                >
                  Add details
                </button>
                {/* <button className="btn btn-dark" color="dark" size="lg">
                  <Link to="*">Skip</Link>
                </button> */}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};


export default BankPayment
