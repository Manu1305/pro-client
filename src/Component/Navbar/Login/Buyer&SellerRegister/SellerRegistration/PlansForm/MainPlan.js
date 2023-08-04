import React from 'react';
import plans from './planSec.module.css';

export const  MainPlan=(props)=> {
  return (
    // <div className={plans.contain}>
    <div className={plans.card}>
      <h2 >{props.about}</h2>  
      <div className={plans["card-content"]}>
        <h2>Rs. {props.title}</h2>
        <h6>{props.description}</h6>
        <button>{props.buttonText}</button>
      </div>
    </div>
    // </div>
  );
}

