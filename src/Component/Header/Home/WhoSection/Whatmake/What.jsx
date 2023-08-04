import React from "react";
import styles from "./What.module.css";
import { BsGraphUp, BsStar, BsTelephone } from "react-icons/bs";
import { IoCallOutline } from "react-icons";
import { TbGitBranch, TbTruckDelivery } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import {MdDeleteSweep} from "react-icons/md"
import {AiOutlineShopping,AiOutlineMobile} from 'react-icons/ai'
function Whatmakeus() {
  return (
    <div className={styles.top}>
      <div className={styles.one}>
        <h1 className={styles.mainheading}>
          WHAT
          <br />
          MAKE US DEFFERENT
        </h1>
      </div>
      <div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <BsShop className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>Franchise opertunities</h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <ul className={styles.ullist}>
              <li className={styles.list}>
              • We provide Wholesale ,Retail,and Delivery Franchise oportunities
                to individuals.
              </li>
              <li className={styles.list}>
              • You can select the franchise optons based on your budget.
              </li>
              <li className={styles.list}>
              • We provide proper training and a standard operating manual for ease in managing <br/>
              &nbsp; and operating an outlet.
              </li>
              <li className={styles.list}>
              • Software are installed by Hitec Mart.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <MdDeleteSweep className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>
              Stock clearance
            </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <ul className={styles.ullist}>
              <li className={styles.list}>
              • For any reason , if you are planning to cancel the franchise option , fees are <br/>
              &nbsp; refundable within 45 days.
              </li>
              <li className={styles.list}>
              • if our franchise partner contain any deadstock,it can be exchange through <br/>
              &nbsp;&nbsp;our platforms .
              </li>
             
            </ul>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <AiOutlineShopping className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>Smart returns / replacement </h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <ul className={styles.ullist}>
              <li className={styles.list}>
              • We give options for return and replacement with non-moving products.
              </li>
              <li className={styles.list}>
              • if your bussiness is no longer beneficial, you can return your bulk stock..
              </li>
             
            </ul>
          </div>
        </div>
        <div className={styles.innerone}>
          <div className={styles.ioneone}>
            <AiOutlineMobile className={styles.logo} />
          </div>
          <div className={styles.ionetwo}>
            <h2 className={styles.contentHeading}>Online selling platform</h2>
            <br />
            <br />
            <br />
            <br />
            <br />

            <ul className={styles.ullist}>
              <li className={styles.list}>
              • We offer an online platform for sellers to sell the products.
              </li>
              <li className={styles.list}>
              • We provide a one month free trial and then charges only 5000 for service.
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whatmakeus;