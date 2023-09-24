import React, { useState } from "react";
import styles from "./ContactUs.module.css";

export const ContactUs = () => {

    const scriptUrl = "https://script.google.com/macros/s/AKfycbxIaWaczZmz2RzFxJJorK4X2XJ_rn5mz_FsIsLJJXnjtdZROlUU3oc4UCma_lh12IqU/exec"

    const handleSubmit = (e) =>{
        const formele=document.querySelector("form")

        e.preventDefault()

        const formData =new FormData(formele)

        fetch(scriptUrl, {method: 'POST', body:formData})
        .then(res => {
            alert("Your Message is Successfully Submitted, We will get back to you as soon as possible")
        })
        .catch(err => alert(err))
    }

  return (
    <div>
      <h4>ContactUs</h4>
      <h1 className={styles.header}>Get in Touch</h1>
      <p className={styles.para}>
        we want to hear from you. Let us know how we can help
      </p>
      <div>
        <form className="form" onSubmit={(e)=>{handleSubmit(e)}}  name="google-sheet"    >
          <div className="container mt-5">
            <div className={`row my-4 ${styles.rowww}`}>
              <div className={`col-md-6 ${styles.coll}`}>
                <input placeholder="Name" name="Name" required  className="form-control" />
              </div>
              <div className={`col-md-6 ${styles.coll}`}>
                <input placeholder="Email" name="Email" className="form-control" />
              </div>
            </div>
            <div className={`row my-4 ${styles.rowww}`}>
              <div className={`col-md-6 ${styles.coll}`}>
                <input placeholder="Phone" name="Phone" className="form-control" />
              </div>
              <div className={`col-md-6 ${styles.coll}`}>
                <input placeholder="Age" name="Age" className="form-control" />
              </div>
            </div>
            <div className={`row my-4 ${styles.rowww}`}>
              <div className="col-md-12">
                <input
                  placeholder="Enter Your Message"
                  className="form-control"
                  name="Message"
                />
              </div>
            </div>
          </div>
          <button className={styles.bttt}>Submit</button>
        </form>
      </div>
    </div>
  );
};
