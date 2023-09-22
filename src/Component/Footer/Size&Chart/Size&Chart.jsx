import React from "react";
import styles from "./Size&Chart.module.css";

export const SizeChart = () => {
  return (
    <div>
      <h1 className={styles.header}>Size & Charts</h1>
      <div className={styles["image-container"]}>
        <img src="../Image/hhhh.jpg" alt="cover"  />
        {/* <h1 className={styles["text-overlay"]}>
          CAREERS
        </h1> */}
      </div>{" "}
      <div className={styles.bott}>
        <ol>
          <li className={styles.wholesale}>
            <h3 className={styles.wholesaleH1}>1. Full Sleeve Shirts</h3>
            <p className={styles.wholesaleP}>
              {" "}
              Not sure about your shirt size? Follow these simple steps to
              figure it out: Shoulder - Measure the shoulder at the back, from
              edge to edge with arms relaxed on both sides Chest - Measure
              around the body under the arms at the fullest part of the chest
              with your arms relaxed at both sides. Sleeve - Measure from the
              shoulder seam through the outer arm to the cuff/hem Neck -
              Measured horizontally across the neck Length - Measure from the
              highest point of the shoulder seam to the bottom hem of the
              garment's
            </p>
          </li>
          <li className={styles.wholesale}>
            <h3 className={styles.wholesaleH1}>2. Half Sleeve Shirts </h3>
            <p className={styles.wholesaleP}>
              {" "}
              Not sure about your shirt size? Follow these simple steps to
              figure it out: Shoulder - Measure the shoulder at the back, from
              edge to edge with arms relaxed on both sides Chest - Measure
              around the body under the arms at the fullest part of the chest
              with your arms relaxed at both sides. Sleeve - Measure from the
              shoulder seam through the outer arm to the cuff/hem Neck -
              Measured horizontally across the neck Length - Measure from the
              highest point of the shoulder seam to the bottom hem of the
              garment's
            </p>
          </li>
          <div className={styles["image-containerr"]}>
        <img src="../Image/gggg.jpg" alt="cover" className={styles.imgg} />
     
      </div>{" "}
          <li className={styles.wholesale}>
            <h3 className={styles.wholesaleH1}>3. Measuring T Shirt Size</h3>
            <p className={styles.wholesaleP}>
              {" "}
              Not sure about your t shirt size? Follow these simple steps to
              figure it out: Shoulder - Measure the shoulder at the back, from
              edge to edge with arms relaxed on both sides Chest - Measure
              around the body under the arms at the fullest part of the chest
              with your arms relaxed at both sides. Sleeve - Measure from the
              shoulder seam through the outer arm to the cuff/hem Neck -
              Measured horizontally across the neck Length - Measure from the
              highest point of the shoulder seam to the bottom hem of the
              garment's
            </p>
          </li>
          <div className={styles["image-containerr"]}>
        <img src="../Image/tttt.jpg" alt="cover" className={styles.imggg} />
     
      </div>{" "}
        </ol>
      </div>
    </div>
  );
};
