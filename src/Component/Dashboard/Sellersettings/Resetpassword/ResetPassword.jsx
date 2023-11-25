import React, { useState } from "react";
import styles from "./Reset.module.css";

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Enter old password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
          <label>Enter new password</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <label>Re-enter password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button style={{ backgroundColor: "green" }} type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
