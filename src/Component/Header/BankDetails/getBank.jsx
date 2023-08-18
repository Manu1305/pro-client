import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
const SavedBanks = ({ bank, getSavedBank }) => {
  //
  useEffect(() => {
    getSavedBank();
  }, []);

  return (
    <div style={{ overflowX: "auto" }}>
      <h5 className="mb-0">Saved Bank details</h5>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {bank.map((bankData) => (
          <div
            key={bankData.id}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              border: "1px solid",
              // selectedAddress && selectedbank.id === bank.id
              //   ? "lightblue"
              //   : "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <button
              // onClick={() => removeAddress(bank._id)}
              style={{
                marginRight: "5px",
                backgroundColor: "red",
                border: "none",
                padding: 0,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              remove
            </button> */}

            <div>
              <p>
                <strong>Name:</strong> {bankData.Name}
              </p>
              <p>
                <strong>Bank Name:</strong> {bankData.bankName}
              </p>
              <p>
                <strong>Branch :</strong> {bankData.Branch}
              </p>
              <p>
                <strong>Account Number :</strong> {bankData.AccountNumber}
              </p>
              <p>
                <strong>Ifsc code :</strong> {bankData.ifsc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedBanks;
