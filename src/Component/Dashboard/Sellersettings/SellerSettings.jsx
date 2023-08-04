import React, { useState, useRef, useEffect } from "react";
import SellerProSettings from "./sellerprofilesettings/sellerProfile";
import styles from "./sellersettingsStyle.module.css";
import SellerBankUpdate from "./SellerbankUpdate/SellerBankUpdate";
import ResetPassword from "./Resetpassword/ResetPassword";

function SellerSettingsPage() {

  const [activeSection, setActiveSection] = useState(null);
  const sectionsRef = useRef(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionsRef.current.getBoundingClientRect();
      if (rect.top <= 0) {
        sectionsRef.current.classList.add(styles.sticky);
      } else {
        sectionsRef.current.classList.remove(styles.sticky);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={sectionsRef} className={styles.sections}>
        <div
          className={`${styles.section} ${
            activeSection === "profile" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("profile")}
        >
          Profile
        </div>
        <div
          className={`${styles.section} ${
            activeSection === "bank" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("bank")}
        >
          Bank
        </div>
        <div
          className={`${styles.section} ${
            activeSection === "Password" ? styles.active : ""
          }`}
          onClick={() => handleSectionClick("Password")}
        >
          Password
        </div>
        
      </div>
      <div className={styles.content}>
        {activeSection === "profile" && <SellerProSettings />}
        {activeSection === "bank" && <SellerBankUpdate />}
        {activeSection === "Password" && <ResetPassword />}
        {/* Render more components based on activeSection */}
      </div>
    </div>
  );
}

export default SellerSettingsPage;
