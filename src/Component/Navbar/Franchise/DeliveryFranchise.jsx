import React from "react";
import idea from "./Franchise.module.css";
import ImageWholesale from "../../../images/DeliveryFranch.png";
import { Footer } from "../../Footer/Footer";

export const DeliveryFranchise = () => {
  return (
    <>
      <div className={idea["image-container"]}>
        <img src={ImageWholesale} alt="cover" />
        {/* <h1 className={idea["text-overlay"]}>
          Quality, Service & Diversity are Assured{" "}
        </h1> */}
      </div>
      <div>
        <h2 className={idea.headder}>Why Do We Need a Delivery Franchise?</h2>
        <p className={idea.parag}>
          HiTec Mart, a leading B2B marketplace is offering delivery franchise
          opportunities to individuals who are interested in product delivery in
          garments and footwear. With HiTec Mart’s delivery franchise
          opportunity, you can be a successful entrepreneur in this fast-paced
          world of product delivery.
        </p>
        <p className={idea.parag}>
          {" "}
          Take your delivery career to the next level with HiTec Mart and don’t
          miss out on this opportunity to join a growing and supporting network.
          As the best b2b delivery franchise in India, we support you to fulfill
          your business dreams.. {" "}
        </p>
        <div>
        <h3 className={idea.eligi}>Our Delivery Service Benefits</h3>

          <ol>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}>
                1. Bulk orders from retailers
              </h3>
              <p className={idea.wholesaleP}>
                {" "}
                Get a steady flow of daily bulk orders from retailers and
                increase your income. Take advantage of this strategic
                opportunity to build a thriving business and play a vital role
                in the supply chain, all while enjoying the benefits of
                entrepreneurial success.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}>2. Weekly payout</h3>
              <p className={idea.wholesaleP}>
                {" "}
                Receive timely and convenient weekly payouts for your hard work.
                Join us today to experience the convenience and financial
                security of weekly payouts while running your successful and
                profitable delivery franchise.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}> 3. Earn up to Rs. 200/order</h3>
              <p className={idea.wholesaleP}>
                {" "}
                Enjoy competitive earnings for every order delivered. As a
                franchise partner, you'll have the opportunity to maximize your
                income with every order you fulfill. This commission structure
                allows you to gain the rewards of your hard work and dedication.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}> 4. Exclusive franchise</h3>
              <p className={idea.wholesaleP}>
                {" "}
                Our delivery franchise is exclusive. One Pincode.One Franchise.
                Our franchise partners enjoy the unique privilege of being part
                of an exclusive network, where you have the opportunity to serve
                insightful customers and grow your business in a specialized
                market segment.
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}> 5. 24/7 Support</h3>
              <p className={idea.wholesaleP}>
                {" "}
                Our dedicated support team is available around the clock to
                address your inquiries, resolve any issues, and ensure your
                franchise operations run smoothly. With our continuous support,
                you're never alone on your journey to success in the delivery
                business
              </p>
            </li>
            <li className={idea.wholesale}>
              <h3 className={idea.wholesaleH1}> 6. Technical assistance</h3>
              <p className={idea.wholesaleP}>
                {" "}
                Our expert technical support team is here to provide you with
                guidance, resolve any technical issues, and ensure that you have
                the tools and knowledge needed to succeed in the delivery
                business.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className={idea.eligi}>Terms & Conditions</h3>
          <ol>
            <li className={idea.elll}>
              1. Must be located in a radius of 20 km in a metropolitan city
            </li>
            <li className={idea.elll}>
              2. Need to hire at least 02 delivery personnel to fulfill the
              orders
            </li>
            <li className={idea.elll}>
              3. Should comply with relevant rules and regulations under, the
              motor vehicle act, 1988, and other acts as well
            </li>
            <li className={idea.elll}>
              4. Must be responsible for goods and punctual to the order
              delivery
            </li>
          </ol>
        </div>
        {/* <div>
          <h3 className={idea.eligi}>Store Highlights</h3>
          <ol>
            <li className={idea.elll}>500+ product varieties</li>
            <li className={idea.elll}>Attract interior design</li>
            <li className={idea.elll}>Popular brands</li>
            <li className={idea.elll}>Partnered with 100+ manufacturer</li>
            <li className={idea.elll}>Guaranteed customer satisfaction</li>
          </ol>
        </div> */}

        <div className={idea.margbot}>
          <h3 className={idea.eligi}>Other Benefits & Rewards</h3>
          <ol>
            <li className={idea.elll}>
              1. Daily earning potential up to Rs 6000 per day
            </li>
            <li className={idea.elll}>
              2. Hassle-free fast weekly payout straight into your account
            </li>
            <li className={idea.elll}>
              3. A minimal security deposit of Rs. 100000 +18% GST only
            </li>
            <li className={idea.elll}>
              4. Get residential storage rental upto Rs. 7000 per month
            </li>
            <li className={idea.elll}>
              5. Field sales executive training & salary will be provided
            </li>
          </ol>
        </div>
     
      </div>
      <Footer/>

    </>
  );
};
