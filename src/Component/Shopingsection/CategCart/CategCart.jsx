import React, { useState } from "react";
import styles from "./CategCart.module.css";
import womenCatImg from "../../../images/womencategory.png"
import mensCatIMG from "../../../images/mencategory.png"
import kidsCatIMG from "../../../images/kidscategory.png"

import { useNavigate } from "react-router-dom";
export const CategCart = () => {
  

  const navigation = useNavigate()

  const categories = [
    {
      cate: "MENS",
      category:'Mens',
      imgUrl:mensCatIMG    },
    {
      cate: "WOMENS",
      category:'Womens',
      imgUrl:
      womenCatImg,
    },
    {
      cate: "KIDS",
      category:'Kids',
      imgUrl:
        kidsCatIMG,
    },
    {
      cate: "ALL",
      category:'all',
      imgUrl:
        "https://img.freepik.com/free-photo/clothes_144627-25214.jpg?t=st=1689148141~exp=1689148741~hmac=68afcca0925f34e991bf2b8f0eba9032f8e57f484f620c96efce42fad14cc182",
    }
  ];




  const categoriesType = (type) => {
    
    navigation(`/shoppingPage/${type}`);
  };



  return (
    <div className={styles["login-new"]}>
      <a
        href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
        rel="stylesheet"
      />
      {/* <div style={{ marginTop: "100px" }}>
        <h1 className="font-extrabold ">CATEGORIES</h1>
      </div> */}

      <section className={styles.heroSection}>
        <div className={styles.cardGrid}>
          {categories.map((cat) => (
            <>
              {" "}
              <div className={styles.card} onClick={() => categoriesType(cat.category)} >
                <div
                  className={styles.cardBackground}
                  style={{
                    backgroundImage:
                      `url(${cat.imgUrl})`,
                  }}
                ></div>
                <div className={styles.cardContent}>
                  <p className={styles.cardCategory}>{cat.cate}</p>
                </div>
              </div>
            </>
          ))}
   
        
        </div>
      </section>
    </div>
  );
};
