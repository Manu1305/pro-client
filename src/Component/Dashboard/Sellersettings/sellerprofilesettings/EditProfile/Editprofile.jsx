import React, { useState } from "react";
import Styles from "./Editprofile.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../../../Redux/user/userAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiURL } from "../../../../../const/config";


function Editprofile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const response = await axios.patch(
          `${apiURL}/user/updateProfile`,
          { name, phone },
          config
        );

        if (response && response.data && response.data.user) {
          dispatch(addUser(response.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Profile successfully updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/Profilepage/id");
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };


  const validate = () => {
    let nameError = "";

    if (!name) {
      nameError = "type name";
    }
    setNameError(nameError);
    if (nameError) {
      return false;
    }

    return true;
  };

  return (
    <div className={Styles.main} style={{ height: "800px" }}>
      <div className={Styles.header}>
        <div className={Styles.imgdiv}>
          <img
            style={{ borderRadius: "50%" }}
            src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
            alt=""
          />
          <div className="mt-5">
            <h2>hello</h2>
            <h5 className="ml-5">{user.name}</h5>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={`card ${Styles.scrollableContainer}`}>
          <div className="card-body">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mb-3 text-primary">Personal Details</h6>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  {nameError && <div className="text-danger">{nameError}</div>}
                  <label htmlFor="fullName">Update Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="eMail">Update Email</label>
                  <input type="email" className="form-control"  id="eMail" />
                </div>
              </div> */}
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="phone">Update Phone</label>
                  <input
                    type="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                {/* <div className="form-group">
                  <label htmlFor="website">Update Website URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="website"
                    placeholder="Website URL"
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
                  <label htmlFor="Street">Update Street</label>
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
                  <label htmlFor="ciTy">Update City</label>
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
                  <label htmlFor="sTate">Update State</label>
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
                  <label htmlFor="zIp">Update Zip Code</label>
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
                <div className="text-right">
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-info"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
