import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer>
      <div className={styles.main}>
        <div className={styles.two}>
          <div className={styles.twoOne}>
            <h2 className={styles.twoheading}>HITECMART</h2>
            <p className="text-white">
              Complete your style with awesome <br />
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                clothes from us.
              </p>
            </p>
            <div className={styles.list1}>
              <ul className={styles.listul}>
                <Link className={styles.listhead}>Get In Touch</Link>
                <Link className={styles.links}>
                  {" "}
                  <i className="fa fa-phone" style={{color:"white"}} aria-hidden="true"></i> : 9711811030{" "}
                </Link>
                <Link className={styles.links}><i class="fa fa-building" aria-hidden="true"></i> :

                  {" "}
                  Plot No: 128-P2, Ground Floor, EPIP Zone Whitefield Rd, near
                  Ginger Hotel, Whitefield, EPIP Zone, Bengaluru, Karnataka
                  560066
                </Link>
                <Link className={styles.links}><i class="fa fa-envelope-o" aria-hidden="true"></i> : support@hitecmart.com </Link>
              </ul>
            </div>
            <div className={styles.iconsmain}>
              <div className={styles.icon}>
                {" "}
               <Link to="https://www.facebook.com/Hitecmart1"><FaFacebookF /></Link> 
              </div>
              <div className={styles.icon}>
              <Link to="https://www.instagram.com/hitecmart/"><BsInstagram /></Link>  
              </div>
              <div className={styles.icon}>
               <Link to="https://twitter.com/hitecmart/"> <ImTwitter /></Link>
              </div>
              <div className={styles.icon}>
               <Link to="https://www.linkedin.com/company/hitech-mart/"><FaLinkedinIn /></Link> 
              </div>
            </div>
          </div>
          <div className={styles.twoTwo}>
            <div className={styles.listmain}>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Company</Link>
                  <Link to="/about" className={styles.links}>
                    About
                  </Link>
                  <Link to="/contactUs" className={styles.links}>Contact us</Link>
                  {/* <Link className={styles.links}>Support</Link> */}
                  <Link to="/career" className={styles.links}>Careers</Link>
                </ul>
              </div>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Quick link</Link>
                  <Link className={styles.links}>Share location</Link>
                  <Link className={styles.links}>Order tracking</Link>
                  <Link to="/sizeChart" className={styles.links}>Size Guide</Link>
                  <Link to="/faq" className={styles.links}>FAQs</Link>
                </ul>
              </div>
              <div className={styles.list}>
                <ul className={styles.listul}>
                  <Link className={styles.listhead}>Legal</Link>
                  <Link to="/termsCond" className={styles.links}>Terms and conditions </Link>
                  <Link to="/privacyPol" className={styles.links}>Privacy and policy</Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ backgroundColor: "black" }} className={styles.hhhhh}>
        Copyright © 2023 HiTec Mart, All Right Reserved.
      </p>
    </footer>
  );
};

// export default Footer;
