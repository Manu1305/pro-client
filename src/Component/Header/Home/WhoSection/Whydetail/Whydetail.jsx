import React from "react";
import styles from "./Whydetail.module.css";
import { BsGraphUp, BsStar ,BsTelephone} from "react-icons/bs";
import {IoCallOutline} from 'react-icons'
import {TbGitBranch,TbTruckDelivery} from 'react-icons/tb'

function Whydetail() {
  return (
    <div className={styles.top}>
      <div className={styles.one}>
        <h1 className={styles.mainheading}>
          WHY <br />
          HITEC MART ?
        </h1>
      </div>
      <div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <BsGraphUp className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
              Driving bussiness growth and expansion
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
              The value of our products undoubtedly drives your bussiness growth
              and expands your <br />
              customer base. We provide valuable insights and analyticals
              reports involved in <br />
              bussinesses with the help of various analytical tools. So , it is
              easy to forecast market <br />
              trends
            </h5>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <TbGitBranch className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
             Wide range of product categories 
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
             We always stays ahead of market trends. It helps us to understand emerging product <br />
              categories avalilable in the market .Also these extensive collections  help wholesalers <br />
              bussinesses with the help of various analytical tools. So , it is
              and retailers find specific products to grow their bussinesses.<br />
              trends
            </h5>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <BsStar className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
             Quality and trust 
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
             Quality and trust are two sides of coin. We assure the quality of the products through<br />
              various measures.Also,our good customer feedback and reviews helps to maintain  <br />
              good trust in bussiness and encourage long-term partnerships<br />
              trends
            </h5>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <BsTelephone className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
              Support and assistance 
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
              We provide sustainable and transparent bussiness support and assistance  and it helps<br />
              to avoid the problem involved in transactions.BY associating with HitecMart ,you can  <br />
              bussinesses with the help of various analytical tools. So , it is
              ensure your bussiness's success. <br />
              trends
            </h5>
          </div>
        </div>

        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <TbTruckDelivery className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
            Quick doorstep delivery 
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
              We know the importance of delivering the products in a time frame and it plays an <br />
              important role to meet the customer expectations.We assure you the fast delivery to
             your shop and avoid unnecessary delays in supply trends.
            </h5>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Whydetail;