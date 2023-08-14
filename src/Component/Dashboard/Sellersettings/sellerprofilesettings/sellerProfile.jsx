import React, { useEffect, useState } from "react";
import "./sellerprofile.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SavedAddress from "../../../Header/Alreadysavedaddress/Saved";
import NewAddress from "../../../Header/NEwAddress/NewAddress";
import SavedBanks from "../../../Header/BankDetails/getBank";
import axios from "axios";
import { apiURL } from "../../../../const/config";
import { getUserAddress } from "../../../../const/api";
function SellerProSettings() {
  const [newaddressForm, setNewaddressform] = useState(false);
const[bank,setBank]=useState([])
  const viewform = () => {
    setNewaddressform(!newaddressForm);
  };

  const user = useSelector((state) => state.userReducer.user);

  const Navigate = useNavigate();
  if (!user) {
    Navigate("/login");
  }

  const [addresses, setAddresses] = useState([]);

  const getSavedAddress = async() => {
    const ans = await getUserAddress()
    setAddresses(ans)
  }
  useEffect(() => {
    getSavedAddress()
  }, []);


   const getSavedBank = async () => {
     try {
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       };

       const response = await axios.get(
         `${apiURL}/Bankdetails/getBankData/${user.email}`,
         config
       );

       console.log(response.data)

       setBank(response.data);
       console.log("bankdata"+bank)
     } catch (error) {
       console.log("API Error", error);
     }
   };

   useEffect(() => {
     getSavedBank();
   }, []);
  return (
    <div >
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="Admin-image"
                      />
                    </div>
                    <h5 className="user-name">{user.name}</h5>
                    <h6 className="user-email">{user.email}</h6>
                  </div>
                  <div className="about">
                    <h5 className="mb-2 text-primary"> </h5>
                    <p>Premium subscriber </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-3 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="fullName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={user.name}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        value={user.email}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={user.phone}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    {/* <div className="form-group">
                      <label for="website">Update Website URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        placeholder="Website url"
                      />
                    </div> */}
                  </div>
                </div>
                {/* <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-3 text-primary">Update Address</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="Street">Update Street</label>
                      <input
                        type="name"
                        className="form-control"
                        id="Street"
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="ciTy">Update City</label>
                      <input
                        type="name"
                        className="form-control"
                        id="ciTy"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="sTate">Update State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="sTate"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="zIp">Update Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div> */}

                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <Link to="/editprofile">
                      <div className="text-right">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>

                {user?.urType === "buyer" && (
                  <div>
                    <SavedAddress
                      addresses={addresses}
                      getSavedAddress={getSavedAddress}
                    />

                    <button
                      onClick={viewform}
                      style={{
                        backgroundColor: "orange",
                        borderRadius: "10px",
                      }}
                    >
                      Add New Address{" "}
                    </button>
                    {newaddressForm && (
                      <NewAddress getSavedAddress={getSavedAddress} />
                    )}
                  </div>
                )}

                {user?.urType === "seller" && (
                  <div>
                    <SavedBanks bank={bank} getSavedBank={getSavedBank} />

                    {/* <button
                      onClick={viewform}
                      style={{ backgroundColor: "blue", borderRadius: "10px" }}
                    >
                      Add New Bank
                    </button> */}
                    {/* {newaddressForm && <NewAddress getSavedBank={getSavedBank} />} */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProSettings;
