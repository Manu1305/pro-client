
import React, { useState,useEffect } from "react";
import styles from './NewAddress.module.css';
import Swal from "sweetalert2";
import { apiURL } from "../../../const/config";
import httpService from "../../../Error Handling/httpService";

function NewAddress({getSavedAddress}) {
  const [add, setAdd] = useState("");
  const [address, setAddress] = useState({
    name: "",
    pincode: "",
    locality: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
    phone: null,
  });

  const onChangeHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // geo fencing

  // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
    });
  }, []);
  console.log(add, "data");

  function getAddress() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address)
       
        );
      console.log(add, "dfcdfk");
    });
    
  }



  const saveAddressHandler = async (e) => {
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
          `${apiURL}/address/add-address`,
          {
            addressDetails: address,
          },
          config
        )
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Address addded",
            showConfirmButton: false,
            timer: 1500,
          });
          getSavedAddress();
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        {/* <button className="bg-red-400 w-20" onClick={getAddress}> allow location </button> */}
      <div className={styles.formdiv}>
        <input
          className={styles.inputbox}
          type="text"
          placeholder="Name"
          name="name"
          onChange={onChangeHandler}
        />
        <div className={styles.divresponsive}>
          <input
            className={`${styles.responsiveinput} `}
            type="text"
            name="state"
            placeholder="State"
            
            onChange={onChangeHandler}
          />
          <input
            className={` ${styles.responsiveinput1}`}
            type="text"
            name="area"
            placeholder="Dist"
           
            onChange={onChangeHandler}
          />
        </div>
        <div className=" mob:flex-col">
          <input
            className={styles.inputbox}
            type="text"
            placeholder="Address"
            onChange={onChangeHandler}
          />
          <br />
          <input
            className={styles.inputbox}
            type="text"
            placeholder="Locality"
            name="locality"
            onChange={onChangeHandler}
           
          />
          <div className={styles.divresponsive}></div>
        </div>
        <div className={styles.divresponsive}>
          <input
            className={`${styles.responsiveinput}`}
            type="text"
            name="city"
            placeholder="City"
           
            onChange={onChangeHandler}
          />
          <input
            className={` ${styles.responsiveinput1}`}
            type="text"
            placeholder="Landmark"
            onChange={onChangeHandler}
         
          />
        </div>
        <div className={styles.divresponsive}>
          <input
            className={` ${styles.responsiveinput}`}
            type="number"
            name="pincode"
            onChange={onChangeHandler}
            placeholder="Pin"
       
          />
          <input
            className={` ${styles.responsiveinput1}`}
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
          />
        </div>

        <button className={styles.button} onClick={saveAddressHandler}>
          Add This Address
        </button>
        <div className={styles.return}>
          {/* <div className="mt-3 text-red-600"><AiOutlineLeft/></div> */}
        </div>
      </div>
    </>
  );
}

export default NewAddress;