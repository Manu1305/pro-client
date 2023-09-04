import React from 'react'
import styles from "./Strength.module.css"
function Strength() {
  return (
    <div className="bg-white">
      <div>
        <h1 className="w-100% font-extrabold">OUR KEY STRENGHTS</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.one}>
          <div className={styles.innerone}>
            <h4 className={styles.headingtext}>1000 +</h4>
            <h4 style={{fontWeight:'bolder'}} className={styles.subheading}>Active retailers</h4>
            <h6 className={styles.content}>
              We have 1000+ Retails from pan
              <br />
              india who places orders on a <br />
              regular basis.
            </h6>
          </div>
          <div className={styles.innertwo}>
            <h4 className={styles.headingtext}>60000 +</h4>
            <h4 style={{fontWeight:'bolder'}} className={styles.subheading}>Product delivered</h4>
            <h6  className={styles.content}>
              6000+ Products Successfully
              <br />
              Delivered to the retailers in pan
              <br />
              India .
            </h6>
          </div>
        </div>

        <div className={styles.two}>
          <div className={styles.innerone}>
            <h4 className={styles.headingtext}>500+</h4>
            <h4 style={{fontWeight:'bolder'}} className={styles.subheading}>Manufactures</h4>
            <h6 className={styles.content}>
              We have 500+ Active
              <br />
              Manufactures who sell their <br />
              products through our platform.
            </h6>
          </div>

          <div className={styles.innertwo}>
            <h4 className={styles.headingtext}>50 +</h4>
            <h4 style={{fontWeight:'bolder'}} className={styles.subheading}>Franchise partners </h4>
            <h6 className={styles.content}>
              We have 50+ franchise partners
              <br />
              who work as delivery partners and <br />
              wholesale partners
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Strength
