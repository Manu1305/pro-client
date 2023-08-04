import React from "react";
import styles from "./WhoWeare.module.css";
import { BsGraphUp, BsStar ,BsTelephone} from "react-icons/bs";
import {IoCallOutline} from 'react-icons'
import {TbGitBranch,TbTruckDelivery} from 'react-icons/tb'

function WhoWeAre() {
  return (
    <div className={styles.top}>
      <div className={styles.one}>
        <h1 className={styles.mainheading}>
          WHO <br />
          WE ARE ?
        </h1>
      </div>
      <div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <BsGraphUp className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
              Pioneer in b2b marketing industry 
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <h5 className={styles.content}>
              Hitec mart is the fastest growing B2B marketplace in india and offer bulk purchases of various categories of products in garments
              and footwear for wholesales and retailers. As pioneer in the industry ,we continue to shape the future of b2b marketing by
              optimising inventory management,reducing costs,and strengthening profitablility.<br />
              <br/>
              <br/>
              <br/>
              We always stays ahead of market trends. It helps us to understand emerging product <br />
              categories avalilable in the market .Also these extensive collections  help wholesalers <br />
              bussinesses with the help of various analytical tools. So , it is
              and retailers find specific products to grow their bussinesses.<br />
              trends
            </h5>
          </div>
        </div>
     

        
      </div>
    </div>
  );
}

export default WhoWeAre;