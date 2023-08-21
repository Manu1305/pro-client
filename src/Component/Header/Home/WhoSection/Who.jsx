import React from "react";
import styles from "./Who.module.css";
import { Navigate, useNavigate } from "react-router-dom";

function Who() {
  const navigate=useNavigate()
  return (
    <div>
      <div className={styles.container}>
        
        <div className={styles.redBox} onClick={()=>{navigate('whoweare')}}>
          <h1 className={`${styles.text} ${styles.whiteText}`}>WHO</h1>
        
        </div>
        
        <div className={styles.whiteBox}  onClick={()=>{navigate('whyus')}} >
          <h1 className={`${styles.text} ${styles.redText}`}>WHY</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.whiteBox}  onClick={()=>{navigate('whatus')}}>
          <h1
            className={`${styles.text} ${styles.redTextlast} ${styles.leftMargin}`}
          >
            WH
          </h1>
        </div>
        <div className={styles.redBox} onClick={()=>{navigate('whatus')}}>
          <h1
            className={`${styles.text} ${styles.whiteTextlast} ${styles.rightMargin}`}
          >
            AT
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Who;
