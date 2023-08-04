import React from 'react'

const SellerBankUpdate=()=> {
  return (
    <div>
      <form action="" method="post" style={{width:"400px"}}>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="acc_number">
            Account Number&nbsp;<span class="required">*</span>
          </label>
          <input
            type="text"
            class="woocommerce-Input woocommerce-Input--text input-text"
            name="acc_number"
            id="acc_number"
            value=""
          />
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="acc_name">
            Account Name&nbsp;<span class="required">*</span>
          </label>
          <input
            type="text"
            class="woocommerce-Input woocommerce-Input--text input-text"
            name="acc_name"
            id="acc_name"
            value=""
          />
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="acc_ifsc">
            Bank IFSC&nbsp;<span class="required">*</span>
          </label>
          <input
            type="text"
            class="woocommerce-Input woocommerce-Input--text input-text"
            name="acc_ifsc"
            id="acc_ifsc"
            value=""
          />
        </p>
        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label for="acc_type">
            Type of Account&nbsp;<span class="required">*</span>
          </label>
          <input
            type="text"
            class="woocommerce-Input woocommerce-Input--text input-text"
            name="acc_type"
            id="acc_type"
            value=""
          />
        </p>
        <p>
          <button
            type="submit"
            class="woocommerce-Button button"
            name="save_bankdetails"
            value="save_bankdetails"
          >
            Submit Details
          </button>
          <input
            type="hidden"
            name="save_bankdetails"
            value="save_bankdetails"
          />
        </p>
      </form>
    </div>
  );
}

export default SellerBankUpdate
