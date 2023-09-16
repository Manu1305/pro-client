import React from "react";
import idea from "./Franchise.module.css";


export const WholesaleStore = () => {
  return (
    <>
      <div className={idea["image-container"]}>
        <img src="../Image/WholesaleFran.jpg" alt="cover" />
        {/* <h1 className={idea["text-overlay"]}>
          Quality, Service & Diversity are Assured{" "}
        </h1> */}
      </div>
      <div>
        <h2 className={idea.headder}>
          Why Do We Need a Wholesale Store Partner?
        </h2>
        <p className={idea.parag}>
          As we are branching out to more locations across India, our network
          and presence need to diversify. For that, we invite a strong wholesale
          store franchise partner to collaborate with us from the long-term
          perspective. This will help you to establish your brand in a
          competitive market and provides a strong foundation and support to
          succeed in the competitive wholesale market.
        </p>
        <p className={idea.parag}>
          {" "}
          As the best b2b wholesale store franchise in India, we expect you to
          keep our products in the store and manage the products in and out with
          the help of staff and software. You will receive bulk orders from
          retailers near the wholesale store. So you should make sure that
          products should be delivered to retailers on time.{" "}
        </p>
        <p className={idea.parag}>
          {" "}
          We are a wholesale business platform that offers a wide range of
          products along with garments and footwear for men, women, and kids. We
          have our own software application, that is designed as a complete
          solution for the wholesale stores. It can be used in stock management,
          sales management, delivery, and staff management system.{" "}
        </p>
        <p className={idea.parag}>
          {" "}
          We have a strong presence in both online as well as offline platforms
          and have 500+ categories in both garment and footwear collections.{" "}
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
            <li className={idea.elll}>1. Operational store area</li>
            <li className={idea.elll}>
              2. A minimum of 700 sqft and above space is required.
            </li>
            <li className={idea.elll}>3. Investment</li>
            <li className={idea.elll}>
              4. A minimum of 15 -25 lakhs investment is required
            </li>
            <li className={idea.elll}>5. A good business mind</li>
            <li className={idea.elll}>
              6. You should have a good business mind to make a good sale.
            </li>
            <li className={idea.elll}>7.Accessible store location</li>
            <li className={idea.elll}>
              8.The store location should be easily accessible.{" "}
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

        <div>
          <h3 className={idea.eligi}>Benefits & Rewards</h3>
          <ol>
            <li className={idea.elll}>1. Earn up tp 10% per month</li>
            <li className={idea.elll}>2. Reward uo to 20% on your sale</li>
            <li className={idea.elll}>3. Interior & staff training</li>
            <li className={idea.elll}>4. 24*7 software & customer support</li>
          </ol>
        </div>
      </div>
    </>
  );
};
