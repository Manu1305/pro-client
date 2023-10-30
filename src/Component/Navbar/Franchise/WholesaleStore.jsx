import React from "react";
import idea from "./Franchise.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Wholesale from "../../../images/wholesaleFran.png";
import { Footer } from "../../Footer/Footer";

export const WholesaleStore = () => {
  return (
    <>
      <div className={idea["image-container"]}>
        <img src={Wholesale} alt="cover" />
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
        {/* <div>
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
        </div> */}

        <div>
          <h3 className={idea.eligi}>Terms & Conditions</h3>
          <ol>
            <li className={idea.elll}>
              1. The store must be located in the nearby township or market.
            </li>
            <li className={idea.elll}>
              2. Must have at least 1000 sqft to 1500 sqft space.
            </li>
            <li className={idea.elll}>
              3. Any type of vehicle should get inside the store.
            </li>
            <li className={idea.elll}>
              4. The store should be constructed as per fire safety rules and
              located in a safe place.
            </li>
            <li className={idea.elll}>
              5. The complete responsibility of the store will be up to the
              store owner.
            </li>
            <li className={idea.elll}>
              6. The investment amount is about 20 lakhs to 30 lakhs.
            </li>
          </ol>
        </div>

        <div className={idea.margbot}>
          <h3 className={idea.eligi}>Benefits & Rewards</h3>
          <ol>
            <li className={idea.elll}>
              1. The store owner will get a fixed amount from HiTec Mart on a
              monthly basis of up to 2,50,000 and also 20% of the total profit
              from the store.
            </li>
            <li className={idea.elll}>
              2. Additional bonuses and rewards will be provided based on
              monthly sales or time-to-time offers given by HiTec Mart.
            </li>
            <li className={idea.elll}>
              3.The staff salary is paid by HiTec Mart.
            </li>
            <li className={idea.elll}>4. The payout period is monthly.</li>
            <li className={idea.elll}>
              5. The software is installed by HiTec Mart. 
            </li>
            <li className={idea.elll}>
              6. The staff training and management are done by HiTec Mart.
            </li>
          </ol>
        </div>
        {/* <Footer/> */}
      </div>
      <Footer/>
    </>
  );
};
