import { Grid } from "@mui/material";
import React from "react";
import aboutus from "./About.module.css";

export const TeamMembers = () => {
  return (
    <div className={aboutus["ep-parent1"]}>
      <div className={aboutus["ep-left"]}>
        <div className={aboutus["epl-team"]}>
          <p style={{ fontSize: "25px" }}>Founder</p>
        </div>
        <div className={`${aboutus["team-body"]} ${aboutus["col-first"]}`}>
          <div className={aboutus["tupper"]}>
            <Grid container>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <div className={aboutus["tprofilecard"]}>
                  <div className={aboutus["image"]}></div>
                  <div style={{ textAlign: "center" }}>
                    <img
                      className={aboutus["image1"]}
                      src={"../Image/newArr9.webp"}
                      alt={""}
                      style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className={aboutus["tpc-name"]}>Kartik</div>
                  {/* <div className="tpc-post">CO-FOUNDER</div> */}
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={9} lg={9}>
                <div className={aboutus["tutext"]}>
                  Jhankar, Branding and PR professional and managing director at
                  Ibechs Pvt Ltd a well known Digital Marketing and PR agency
                  has worked with big names like Michael Bloomberg, Prabhudeva,
                  Usha Uthup, New Castle University, Pro Kabbadi League,
                  thousands of Authors, Influencers and powerful brands. She was
                  also instrumental in the inception of Professional Seller
                  Association of India and working closely with such Seller she
                  realised 2 major things: 1. Every expert and achiever
                  eventually has to become a Seller 2. Seller, Trainers,
                  Founders and Experts struggle to find events which require
                  their kind of expertise and has a perfect audience for their
                  agenda. She set up a team to research about events and network
                  with event managers, HRs and L&D managers across the globe.
                  After 3 years of thorough research, establishing proper
                  network and team, she decided to create a portal to share this
                  information with everyone. The total number of events listed
                  is minimum 4000 events and target of 40,000 events every year.
                  The total Seller slots in these events including all
                  categories could get over 4,00,000 Seller slots. It has taken
                  over 2 years for her to create this portal and it has all been
                  worth the efforts.
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
