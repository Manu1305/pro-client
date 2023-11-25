import React, { useState } from "react";
import styles from "./Email.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import httpService from "../../../../Component/Error Handling/httpService";
import { apiURL } from "../../../../const/config";


function Changepassword() {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const navigate =useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      httpService
        .put(`${apiURL}/user/updatePassword`, { id, password })
        .then((res) => {
          console.log(res.data);
          alert("Password update successful!");
          navigate('/login')
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card card-outline-secondary">
        <div className="card-header">
          <h3 className="mb-0">Change Password</h3>
        </div>
        <div className="card-body">
          <form
            className="form"
            role="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="inputPasswordOld">Enter Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordOld"
                required=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputPasswordNewVerify">Verify Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordNewVerify"
                required=""
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg float-right bg-black"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;