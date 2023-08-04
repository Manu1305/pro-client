import React from 'react'
import styles from './Review.module.css'
function Review() {
  return (
    <div>

<div className={styles.heading}>
    <h3>CUSTOMER FEEDBACK</h3>
</div>
<div className={styles.reviewmain}>
<div className={styles.rating}>
<h1>4.8</h1>
<div>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
</div>
</div>
<div className={styles.allratingbox}>
  <div className={styles.starmaindiv}>

<div className={styles.bar}>
    <div className={styles.bar5}>

    </div>
    <div className={styles.ratings}>

    
</div>

</div>
<div className={styles.ratings}>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
</div>
  </div>
  <div className={styles.starmaindiv}>

<div className={styles.bar}>
    <div className={styles.bar4}>

    </div>
   
    
</div>
 <div className={styles.ratings}>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star `}></span>
</div>
  </div>
  <div className={styles.starmaindiv}>

<div className={styles.bar}>
    <div className={styles.bar3}>

    </div>
   
    
</div>
 <div className={styles.ratings}>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star $`}></span>
<span  className={`fa fa-star`}></span>
</div>
  </div>

  <div className={styles.starmaindiv}>

<div className={styles.bar}>
    <div className={styles.bar2}>

    </div>
   
    
</div>
 <div className={styles.ratings}>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star`}></span>
<span  className={`fa fa-star`}></span>
<span  className={`fa fa-star`}></span>
</div>
  </div>
  <div className={styles.starmaindiv}>

<div className={styles.bar}>
    <div className={styles.bar1}>

    </div>
   
    
</div>
 <div className={styles.ratings}>

<span className={`fa fa-star ${styles.checked}`}></span>
<span  className={`fa fa-star`}></span>
<span  className={`fa fa-star`}></span>
<span  className={`fa fa-star`}></span>
<span  className={`fa fa-star`}></span>
</div>
  </div>
</div>

</div>

    </div>
  )
}

export default Review