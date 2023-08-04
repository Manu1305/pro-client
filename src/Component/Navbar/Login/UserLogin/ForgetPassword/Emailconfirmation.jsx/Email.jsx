// import React, { useState } from 'react';
// import styles from './Email.module.css';

// function Email() {
//   const [email, setEmail] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   const sendOtp = () => {
//     setShowForm(true);
       
//   };

//   return (
//     <div>
//       <div className={styles.main}>
//         <div className={styles.box1}>
//           <label htmlFor="emaill">Enter the registered Email address</label>
//           <input
//             type="text"
//             className={styles.inputbox}
//             id="emaill"
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <button className="bg-orange-400" onClick={sendOtp}>
//             Send OTP
//           </button>
//           {showForm && (
//             <div>
//               <label htmlFor="password">Enter OTP</label>
//               <input
//                 type="text"
//                 className={styles.otpinput}
//                 id="password"
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//               <button className="bg-green-400">Submit</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Email;

import React, { useState, CSSProperties } from "react";
import styles from "./Email.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from "react-spinners/PropagateLoader"
import { apiURL } from "../../../../../../const/config";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


function EmailCheck() {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

  const Submit = () => {
    try {
      setLoading(true);
      axios
        .post(`${apiURL}/user/forgetpassword`, { email })
        // axios.put("https://localhost:8000/user/updatePassword", { email, password })

        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setLoading(false);
            Swal.fire(
              "link sended successfully",
              `We sended password changing link to this ${email} id `,
              "success"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.message === "User not found") {
            Swal.fire({
              icon: "error",
              title: "this email is not registered with us",
              text: "Please create account ",
              footer: '<a href="/register">create Account?</a>',
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <h2> Forget Password </h2>

        <small>
          No worries We will send you reset link to your registered email id.
        </small>

        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className={styles.button}>
          <button
            onClick={() => {
              Submit();
            }}
          >
            Send Link{" "}
          </button>
        </div>
        <div className="sweet-loading">
          {/*           
          <input
            value={color}
            onChange={(input) => setColor(input.target.value)}
            placeholder="Color of the loader"
          /> */}
          <PropagateLoader color="#36d7b7" loading={loading} />
          {/* <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default EmailCheck;
