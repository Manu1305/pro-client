import React, { useState, CSSProperties } from "react";
import styles from "./Email.module.css";
import Swal from "sweetalert2";
import PropagateLoader from "react-spinners/PropagateLoader";
import { apiURL } from "../../../../../../const/config";
import httpService from "../../../../../Error Handling/httpService";


function EmailCheck() {
  const [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);

  const Submit = () => {
    try {
      setLoading(true);
      httpService.post(`${apiURL}/user/forgetpassword`, { email })
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
          
          <PropagateLoader color="#36d7b7" loading={loading} />
          
        </div>
      </div>
    </div>
  );
}

export default EmailCheck;
