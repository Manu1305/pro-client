import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import {TiDelete} from 'react-icons/ti'
const SavedAddress = ({addresses,getSavedAddress}) => {


  const removeAddress = async (id) => {
   
    Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => { // Add async keyword here
      
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };

          await httpService
            .delete(`${apiURL}/address/delete-address/${id}`, config)
            .then((res) => {
           
              getSavedAddress();
            })
            .catch((err) => {
              console.log(err, 'this error');
            });
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
        Swal.fire(
          'Deleted!',
          'Your Address has been deleted.',
          'success'
        );
      }
    });
  };
  
// useEffect(( getSavedAddress()),[])

  return (
    <div style={{ overflowX: "auto" }}>
      <h5 className="mb-0">Saved Address</h5>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {addresses.map((address) => (
          <div
            key={address.id}
            style={{
              cursor: "pointer",
              backgroundColor:"white",
              border:'1px solid',
                // selectedAddress && selectedAddress.id === address.id
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
            <button
              onClick={() => removeAddress(address._id)}
              style={{
                marginRight: "5px",
                backgroundColor: "red",
                border: "none",
                padding: 0,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
               <TiDelete/>
            </button>

            <div>
              <p>
                <strong>Locality:</strong> {address.addressDetails.locality}
              </p>
              <p>
                <strong>Area:</strong> {address.addressDetails.area}
              </p>
              <p>
                <strong>Landmark:</strong> {address.addressDetails.landmark}
              </p>
              <p>
                <strong>City:</strong> {address.addressDetails.city}
              </p>
              <p>
                <strong>State:</strong> {address.addressDetails.state}
              </p>
              <p>
                <strong>Pincode:</strong> {address.addressDetails.pincode}
              </p>
              <p>
                <strong>Phone:</strong> {address.addressDetails.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* {selectedAddress && (
        <div>
          <h5>Selected Address:</h5>
          <p>
            <strong>Locality:</strong> {selectedAddress.addressDetails.locality}
          </p>
          <p>
            <strong>Area:</strong> {selectedAddress.addressDetails.area}
          </p>
          <p>
            <strong>Landmark:</strong> {selectedAddress.addressDetails.landmark}
          </p>
          <p>
            <strong>City:</strong> {selectedAddress.addressDetails.city}
          </p>
          <p>
            <strong>State:</strong> {selectedAddress.addressDetails.state}
          </p>
          <p>
            <strong>Pincode:</strong> {selectedAddress.addressDetails.pincode}
          </p>
          <p>
            <strong>Phone:</strong> {selectedAddress.addressDetails.phone}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default SavedAddress;
