
// import React from "react";
// import "./Footer.module.css"
// import {
//   MDBFooter,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
// } from "mdb-react-ui-kit";




// export  const  Footer=()=> {
//   return (
//     <MDBFooter
//       className="text-center text-lg-start text-light "
//       style={{ backgroundColor: "#bf0a2a" }}
//     >
//       <section className="">
//         <MDBContainer className="text-center text-md-start mt-5 ">
//           <MDBRow className="mt-3 ">
//             <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 text-light">
//               <h6
//                 className="text-uppercase fw-bold mb-4"
//                 style={{ marginLeft: "20px" }}
//               >
//                 <i className="fas fa-camera-retro"></i>
//                 HitecMart
//               </h6>
//               <p className="text-light" style={{ marginRight: "30px" }}>
              
//                 <a className="text-light"> </a>
//               </p>
//             </MDBCol>

//             <MDBCol
//               md="2"
//               lg="2"
//               xl="2"
//               className="mx-auto mb-4 text-center"
//               style={{ marginLeft: "20px" }}
//             >
//               <div className="d-flex flex-column align-items-start">
//                 <h6
//                   className="text-uppercase fw-bold"
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Explore Our Catalog
//                 </h6>
//                 <div className="d-grid">
//                   <p className="text-light">
//                     <a href="#!" className="text-light">
//                       Mens Clothes
//                     </a>
//                   </p>
//                   <p className="text-light">
//                     <a href="#!" className="text-light">
//                       Women Dresses
//                     </a>
//                   </p>
//                   <p className="text-light">
//                     <a href="#!" className="text-light">
//                       Childrens Clothes
//                     </a>
//                   </p>
//                   <p className="text-light">
//                     <a href="#!" className="text-light">
//                       Garments
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </MDBCol>
//             <MDBCol
//               md="4"
//               lg="3"
//               xl="3"
//               className="mx-auto mb-md-0 mb-4 my-col"
//             >
//               <h6 className="text-uppercase fw-bold mb-4">Looking for us </h6>
//               <p>
//                 <p className="text-light">
               
//                 </p>
//               </p>
//               <p>
//                 <a href="#!" className="text-light">
//                  About Us
//                 </a>
//               </p>
//               <p>
//                 <a href="#!" className="text-light">
//                   Shop
//                 </a>
//               </p>
//               <p>
//                 <a href="#!" className="text-light">
//                   Blog
//                 </a>
//               </p>
//             </MDBCol>

//             <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
//               <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
//               <p className="text-light">
//                 <MDBIcon color="light" icon="home" className="me-2" />
//                 2nd Floor, 91springboard Mahadevpura ORR Bangalore – 560048
//                 Pricing
//               </p>
//               <p className="text-light">
//                 <MDBIcon color="light" icon="envelope" className="me-3" />
//                 support@hitecmart.com
//               </p>
//               <p className="text-light">
//                 <MDBIcon color="light" icon="phone" className="me-3" /> + 91
//                 704304
//               </p>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//       <section className="d-flex justify-content-center justify-content-lg-between p-4 border-top text-light">
//         <div className="me-5 d-none d-lg-block">
//           <span>Get connected with us on social networks:</span>
//         </div>

//         <div>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="facebook-f" />
//           </a>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="twitter" />
//           </a>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="google" />
//           </a>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="instagram" />
//           </a>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="linkedin" />
//           </a>
//           <a href="" className="me-4 text-reset">
//             <MDBIcon color="white" fab icon="github" />
//           </a>
//         </div>
//       </section>
//     </MDBFooter>
//   );
// }
// // export default Footer


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
        <div className={styles.one}>
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
        </div>
        <div className={styles.two}>
          <div className={styles.twoOne}>
            <h2 className={styles.twoheading}>HITECMART</h2>
            <p className="text-white">
              Complete your style with awesome <br />
              clothes from us.
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
    </footer>
  );
}

// export default Footer;