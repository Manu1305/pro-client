import React from "react";
import styles from "./Who.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { useState } from "react";

function Who() {
  const navigate = useNavigate();

  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  return (
    <div>
      <div className={styles.container}>
        <div
          className={`${styles.redBox1}`}
          onClick={() => {
            navigate("whoweare");
          }}

          onMouseOver={() => setState1(true)}
          onMouseOut={() => setState1(false)}
        >
          <Zoom bottom>
            <h1 className={!state1 ? styles.text1 : styles.text1Hover}>WHO</h1>
            
          </Zoom>
          {state1 && (
            <h3 className={`${styles.hovertext}`}>
              WE ARE?
            </h3>
          )}
        </div>

        <div
          className={styles.whiteBox}
          onClick={() => {
            navigate("whyus");
          }}
          onMouseOver={() => setState2(true)}
          onMouseOut={() => setState2(false)}
        >
          <Zoom bottom>
            <h1 className={!state2 ? styles.text2 : styles.text2Hover}>WHY</h1>
          </Zoom>
          {state2 && (
            <h3 className={`${styles.hover1text}`}>
              HITECMART
            </h3>
          )}
        </div>
      </div>
      <div className={styles.container}
       onMouseOver={() => setState3(true)}
       onMouseOut={() => setState3(false)}
       >
        <div
          className={styles.whiteBox}
          onClick={() => {
            navigate("whatus");
          }}
        >
          <Fade left duration={4000}>
            {" "}
            <h1
              className={!state3 ? styles.text3 : styles.text3Hover}
            >
              WH
            </h1>
          </Fade>
          {state3 && (
            <h3 className={`${styles.hover3text}`}>
              MAKE US
            </h3>
          )}
        </div>
        <div
          className={styles.redBox}
          onClick={() => {
            navigate("whatus");
          }}
        >
          <Fade right duration={4000}>
            {" "}
            <h1
             className={!state3 ? styles.text4 : styles.text4Hover}
            >
              AT
            </h1>
          </Fade>
          {state3 && (
            <h3 className={`${styles.hover4text}`}>
              DIFFERENT
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Who;
