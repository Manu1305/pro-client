import React from "react";
import about from "./Aboutsection.module.css";

const ShortAbout = () => {
  return (
    <>
      <div className={about.about}>
        <p className={about.heading1}>ABOUT SPEAKERORE</p>

        <div className={about["cards-section"]}>
          <div className={about.card} style={{ marginTop: "10px" }}>
            <div className={about["fp-cardtext"]}>
              <p className={about.num} style={{ textAlign: "left" }}>
                01
              </p>
              <h3 style={{ textAlign: "left" }}>
                4000+ Speaking Opportunities From Across The World
              </h3>
              <p className={about.desc} style={{ textAlign: "left" }}>
                New leads to apply everyday! Focus on speaking, not lead
                generation. Business growth opportunity - connect with the right
                audience.
              </p>
            </div>

            <img
              className={about.image}
              src={"../Image/newArr6.webp"}
              alt={""}
            />
          </div>
          <div className={about.card} style={{ marginTop: "180px" }}>
            <div className={about["fp-cardtext"]}>
              <p className={about.num} style={{ textAlign: "right" }}>
                02
              </p>
              <h3 style={{ textAlign: "right" }}>
                100+ SpeakerOre Exclusive Events
              </h3>
              <p className={about.desc} style={{ textAlign: "right" }}>
                Reduces competition increasing the probability of being selected
                as a speaker
              </p>
            </div>

            <img
              className="image"
              src={"../Image/newArr5.webp"}
              alt={""}
              style={{ width: "600px", height: "300px" }}
            />
          </div>
          <div className={about.card} style={{ marginTop: "-180px" }}>
            <div className={about["fp-cardtext"]}>
              <p className={about.num} style={{ textAlign: "left" }}>
                03
              </p>
              <h3 style={{ textAlign: "left" }}>
                Directly contact the event managers
              </h3>
              <p className={about.desc} style={{ textAlign: "left" }}>
                No commissions, favouritism. Deal directly with the event
                managers
              </p>
            </div>

            <img
              className={about.image}
              src={"../Image/newArr9.webp"}
              alt={""}
            />
          </div>
          <div className={about.card} style={{ marginTop: "30px" }}>
            <div className={about["fp-cardtext"]}>
              <p className={about.num} style={{ textAlign: "right" }}>
                04
              </p>
              <h3 style={{ textAlign: "right" }}>
                Saves your precious resources (Time, Money & Effort)
              </h3>
              <p className={about.desc} style={{ textAlign: "right" }}>
                Easy, Efficient and Cost Effective. Saves Effort, Time and Money
              </p>
            </div>

            <img
              className={about.image}
              src={"../../Image/category/image16.jpeg"}
              alt={""}
              style={{ height: "300px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShortAbout;
