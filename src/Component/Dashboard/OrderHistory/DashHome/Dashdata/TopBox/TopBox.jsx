import React from "react";
import "./Topbox.scss";
import { topDealUsers } from "./data";

function Topbox() {
  return (
    <div className="topBox">
      <h1 style={{ marginBottom: "20px" }}>Top Deals</h1>
      <div className="list">
        {topDealUsers.map((user) => (
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
                src={user.img}
                alt=""
              />
              <div className="userTexts">
                <span
                  style={{ fontSize: "14px", fontWeight: "500" }}
                  className="username"
                >
                  {user.username}
                </span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">rs{user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topbox;
