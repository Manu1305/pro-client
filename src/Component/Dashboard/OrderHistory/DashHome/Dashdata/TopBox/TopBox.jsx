import React from "react";
import "./Topbox.scss";
import { topDealUsers } from "./data";
import { useState,useEffect } from "react";
import httpService from "../../../../../Error Handling/httpService";
import { apiURL } from "../../../../../../const/config";

function Topbox() {
  const [user, setUser] = useState([]);


  const getUsers = async () => {
    try {
      const res = await httpService.get(`${apiURL}/user/allUserData`);
      console.log("users", res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);



  return (
    <div className="topBox">
      <h1 style={{ marginBottom: "20px" }}>users</h1>
      <div className="list">
        {user.map((user) => (
          <div
          className="listitem"
          style={{
          display: "flex",
          alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
            key={user.id}
          >
            <div className="user" style={{ display: "flex", gap: "20px" }}>
              <img
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                className="images"
                src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                alt=""
              />
              <div className="userTexts">
                <span
                  style={{ fontSize: "14px", fontWeight: "500" }}
                  className="username"
                >
                  {user.name}
                </span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topbox;
