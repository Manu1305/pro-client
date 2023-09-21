import React from "react";
import styles from "./CareerWithUs.module.css";
import Swal from "sweetalert2";

export const CareerWithUs = () => {

    const emailcom = async (id) => {
        Swal.fire({
          title: "Please Share your CV on this Email ID",
          text:"hr@hitecmart.com",
          icon: "Please Share your CV on this Email ID",
      
        })
      };
      const emailwhats = async (id) => {
        Swal.fire({
          title: "Please Contact Us for further Information",
          text:"9711811030",
          icon: "Please Share your CV on this Email ID",
      
        })
      };
  return (
    <div>
      <div className={styles["image-container"]}>
        <img src="../Image/Careerss.jpg" alt="cover" />
        <h1 className={styles["text-overlay"]}>
          CAREERS
        </h1>
      </div>{" "}
      <h1 className={styles.header}>
        Join Our Team and Shape the Future with HiTec Mart
      </h1>
      <p className={styles.para}>
        Are you passionate about driving innovation, growth, and excellence? At
        HiTec Mart, we're not just a business; we're a community of dedicated
        professionals committed to transforming the B2B marketplace. Our team is
        the backbone of our success, and we're always on the lookout for driven
        individuals to join us on our journey.
      </p>
      <h1 className={styles.headerrr}>Join Our Journey</h1>
      <p className={styles.para}>
        At HiTec Mart, we believe that every team member plays a vital role in
        our success. If you're ready to embark on a rewarding career journey,
        explore our current openings and apply today.
      </p>
      <button className={styles.butt}
       onClick={() => emailcom()}
      >Email CVs to:</button>
      <button className={styles.butts}
       onClick={() => emailwhats()}
      >Call/WhatsApp:</button>
    </div>
  );
};
