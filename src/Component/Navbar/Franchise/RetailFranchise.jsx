import React from "react";
import idea from "./Franchise.module.css";
import Retail from "../../../images/ratailfranch.png";
import { Footer } from "../../Footer/Footer";

export const RetailFranchise = () => {
  return (
    <>
      <div className={idea["image-container"]}>
        <img src={Retail} alt="cover" />
        {/* <h1 className={idea["text-overlay"]}>
          Quality, Service & Diversity are Assured{" "}
        </h1> */}
      </div>
      <div>
        <h2 className={idea.headder}>
          Why Do We Need a Retail Store Franchise?
        </h2>
        <p className={idea.parag}>
          As we are branching out to more locations across India, our network
          and presence need to diversify. For that, we invite a strong retail
          store franchise partner to collaborate with us from the long-term
          perspective. {" "}
        </p>
        <p className={idea.parag}>
          {" "}
          As the best b2b retail store franchise in India, our primary objective
          is to meet the essential needs of retailers by providing them with
          quality products. They can order the products directly from HiTec Mart
          and the products are delivered to their doorstep.{" "}
        </p>
        <div>
          <ol>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}>1. To Expand our business</h3>
              <p className={idea.wholesaleP}>
                {" "}
                We are in an expanding stage now. So, we are seeking good
                partners to collaborate with us to diversify the business.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}>2. To help entrepreneurs</h3>
              <p className={idea.wholesaleP}>
                {" "}
                We need franchise partners not only for our growth, but we give
                the opportunity to grow them also.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}>
                {" "}
                3. To make our brand a household name
              </h3>
              <p className={idea.wholesaleP}>
                {" "}
                Through your partnership, we are aiming to increase our brand
                recognition and awareness.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}> 4. To operate efficiently</h3>
              <p className={idea.wholesaleP}>
                {" "}
                We aim to operate efficiently and reduce operational costs
                through your collaboration.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className={idea.eligi}>Eligibility</h3>
          <ol>
            <li className={idea.elllss}>1. Operational store area</li>
            <li className={idea.elll}>
              {" "}
              A minimum of 700 sqft and above space is required.
            </li>
            <li className={idea.elllss}>2. Investment</li>
            <li className={idea.elll}>
              {" "}
              A minimum of 15 -25 lakhs investment is required
            </li>
            <li className={idea.elllss}>3. A good business mind</li>
            <li className={idea.elll}>
              You should have a good business mind to make a good sale.
            </li>
            <li className={idea.elllss}>4.Accessible store location</li>
            <li className={idea.elll}>
              The store location should be easily accessible.{" "}
            </li>
          </ol>
        </div>
        <div>
          <h3 className={idea.eligi}>Store Highlights</h3>
          <ol>
            <li className={idea.elll}>500+ product varieties</li>
            <li className={idea.elll}>Attract interior design</li>
            <li className={idea.elll}>Popular brands</li>
            <li className={idea.elll}>Partnered with 100+ manufacturer</li>
            <li className={idea.elll}>Guaranteed customer satisfaction</li>
          </ol>
        </div>

        <div className={idea.margbot}>
          <h3 className={idea.eligi}>Benefits & Rewards</h3>
          <ol>
            <li className={idea.elll}>1. Earn up tp 10% per month</li>
            <li className={idea.elll}>2. Reward uo to 20% on your sale</li>
            <li className={idea.elll}>3. Interior & staff training</li>
            <li className={idea.elll}>4. 24*7 software & customer support</li>
          </ol>
        </div>
        <Footer/>
      </div>
      <Footer/>

    </>
  );
};
