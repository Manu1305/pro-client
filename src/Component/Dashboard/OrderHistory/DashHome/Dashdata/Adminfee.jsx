import axios from "axios";
import React, { useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { apiURL } from "../../../../../const/config";
import { useSelector } from "react-redux";

function Adminfee() {
  const [button, setButton] = useState(false);
  const [fee, setFee] = useState(10);
  const user = useSelector((state) => state.userReducer.user);

  const toggleEdit = () => {

    setButton(!button);
   
  };


  
  const save = () => {
    setButton(!button);
    axios.put(`${apiURL}/adminfee/updateFees`,{fee}).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };


  return (
    <div>
      <div className="h-64 w-64 shadow-md  rounded  justify-center items-center mt-9 ml-9 flex flex-col">
        <div className="flex flex-row mb-3">
          <BiSolidUserCircle className="h-7 w-7" />
          <h3 className="text-xl">Admin Fee</h3>
        </div>
        <div className="w-64 h-32 flex justify-center items-center relative">
          <div className="h-32 w-36 rounded-2xl flex justify-center items-center border-solid border-2 border-black">
            <input
            type="number"
              className="flex justify-center items-center font-extrabold text-7xl text-red-700 inset-y-0 h-20 w-24"
              readOnly={!button}
              onChange={(e) => {
                setFee(e.target.value);
              }}
              value={fee}
            />
            <p className="text-4xl text-red-500 font-bold">%</p>
          </div>

          {
            user?.urType=="admin" && (

          <div className="absolute bottom-0 right-0">
            {!button && (
              <h2 className="text-green-400 font-semibold" onClick={toggleEdit}>
                Edit
              </h2>
            )}
            {button && (
              <h2 className="text-green-400 font-semibold" onClick={save}>
                Save
              </h2>
            )}
          </div>
            ) 
          }
        </div>
      </div>
    </div>
  );
}

export default Adminfee;
