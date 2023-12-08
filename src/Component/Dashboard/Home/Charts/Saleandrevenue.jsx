import React, { useEffect, useState } from "react";
import { apiURL } from "../../../../const/config";
import { useSelector } from "react-redux";
import axios from "axios";
function Saleandrevenue({ userLength,totalsales,ordersLength,handleLoginTypeChange}) {
  const user = useSelector((state) => state.userReducer.user);

const [fee,setFee]=useState()

  const getadminfee=()=>{
    axios.get(`${apiURL}/product/get-admin-fee`).then((res)=>{
      console.log(res,'its res')
      console.log(res.data.fee,'its res..fee')
      setFee(res.data.fee)
    })

    }
  
    useEffect(()=>{
      getadminfee()
    },[])

  const data = [
    {
      icon: "fa fa-chart-line fa-3x text-danger",
      label: "Total Sales",
      value: totalsales,
      link:'order0'
    },
    {
      icon: "fa-solid fa-money-bill-trend-up fa-3x text-danger",
      label: "Admin Fee ",
      value: Math.round(totalsales * (fee/100).toFixed(3)),
      link:'reversewith'
    },
    {
      icon: "fa fa-chart-area fa-3x text-danger",
      label: "Total Orders",
      value: ordersLength,
      link:'order'
    },
  ];
  if(user&&user.urType!='seller') {

    data.push({
      
        icon: "fa-solid fa-users fa-3x text-danger",
        label: "Total Users",
        value: userLength,
        link:'reversewith'
      
  })  
    
  }

  return (
    <div>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          {data.map((item, index) => (
            <div className="col-sm-6 col-xl-3" key={index}>
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4"
              onClick={()=>{
                handleLoginTypeChange(item.link) 
              }} >
                <i className={item.icon}></i>
                <div className="ms-3">
                  <p className="mb-2">{item.label}</p>
                  <h6 style={{fontWeight:'bolder',color:'black'}} className="mb-0">{item.value}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Saleandrevenue;
