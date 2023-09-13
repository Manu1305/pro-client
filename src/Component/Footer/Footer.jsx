import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { Link } from "react-router-dom";
export const Footer=()=> {
  return (
    <footer>
      <div className={styles.main}>
        {/* <div className={styles.one}>
          <div>
            <h1 className={styles.headinttext}>
              JOIN SHOPPING COMMUNITY TO <br />
              GET MONTHLY PROMO
            </h1>
            <h5 className={styles.subhead}>
              Type your email down below and be young wild generation
            </h5>

            <div className={styles.formbox}>
              <input
                type="text"
                className={styles.subscribe}
                placeholder="&nbsp;&nbsp;&nbsp; Add your email here"
              />
              <button className='bg-black h-10 w-20 text-white rounded' type="submit">
                SEND
              </button>
            </div>
          </div>
        </div> */}
        <div className={styles.two}>
          <div className={styles.twoOne}>
            <h2 className={styles.twoheading}>HITECMART</h2>
            <p className="text-white">
              Complete your style with awesome <br />
              <p style={{display:'flex',justifyContent:'center', alignItems:'center'}}>clothes from us.
                </p>
            </p>
            <div className={styles.iconsmain}>
              <div className={styles.icon}>
                {" "}
                <FaFacebookF />
              </div>
              <div className={styles.icon}>
                <BsInstagram />
              </div>
              <div className={styles.icon}>
                <ImTwitter />
              </div>
              <div className={styles.icon}>
                <FaLinkedinIn />
              </div>
            </div>
          </div>
          <div className={styles.twoTwo}>
            <div className={styles.listmain}>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Company</Link>
                  <Link to="/about" className={styles.links}>About</Link>
                  <Link className={styles.links}>Contact us</Link>
                  <Link className={styles.links}>Support</Link>
                  <Link className={styles.links}>careers</Link>
                </ul>
              </div>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Quick link</Link>
                  <Link className={styles.links}>Share location</Link>
                  <Link className={styles.links}>Order tracking</Link>
                  <Link className={styles.links}>Size Guide</Link>
                  <Link className={styles.links}>FAQs</Link>
                </ul>
              </div>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Legel</Link>
                  <Link className={styles.links}>Terms and conditions </Link>
                  <Link className={styles.links}>Privacy and policy</Link>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p  className={styles.hhhhh}>Copyright © 2023 HiTec Mart, All Right Reserved.</p>
    </footer>
  );
}

// export default Footer;