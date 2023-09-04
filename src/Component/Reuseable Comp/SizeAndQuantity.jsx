import React from "react";

function SizeAndQuantity({ obj, select }) {
  return (
    <div>
      <label>Sizes</label>
      <select
        className={select}
        style={{
          appearance: "none",
          width: "100px",
          marginLeft: "10px",
          WebkitAppearance: "none",
        }}
      >
        {Object.entries(obj).map(([size, quantity]) => (
          <option
            key={size}
            value={size}
            style={{
              fontSize: 13,
              color: "GrayText",
            }}
          >
            {size} - {quantity}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SizeAndQuantity;
