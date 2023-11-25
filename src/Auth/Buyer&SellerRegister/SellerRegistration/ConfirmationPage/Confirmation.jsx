import React, { useState } from "react";
import styles from "./confirmationSeller.module.css";

 const SubscriptionForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showButton, setShowButton] = useState(false);

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);

    // Check if a payment method is selected
    if (selectedPaymentMethod) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleProceed = () => {
 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Prime Listing</h2>
        <p className={styles.content}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an{" "}
        </p>
      </div>

      <div className={styles.card1}>
        <h2>Select Payment Method</h2>
        <div className={styles.paymentOptions}>
          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
            />
            Upi
          </label>
          <label>
            <input
              type="radio"
              value="credit-card"
              checked={paymentMethod === "credit-card"}
              onChange={handlePaymentMethodChange}
            />
            Credit Card 
          </label>
          <label>
            <input
              type="radio"
              value="debit-card"
              checked={paymentMethod === "debit-card"}
              onChange={handlePaymentMethodChange}
            />
            Debit Card
          </label>
        </div>

        {showButton && (
          <button
            className={styles.proceedButtonOrange}
            onClick={handleProceed}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
};
export default SubscriptionForm