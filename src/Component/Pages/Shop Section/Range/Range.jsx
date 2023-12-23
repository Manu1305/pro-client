import React from "react";
import Slider from "@mui/material/Slider";

function Range({ range, setRange }) {
  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Slider
        value={range}
        onChange={handleChanges}

        valueLabelDisplay="auto"
        min={130}
        max={3000}
      />
      <span style={{ fontWeight: "500" }}>
        {" "}
        Price: {range[0]} - {range[1]}
      </span>
    </div>
  );
}

export default Range;
