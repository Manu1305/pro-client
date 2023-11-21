import React, { useState } from "react";

const TruncatedText = ({ text, maxLines }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const getTruncatedText = () => {
    const words = text.split(" ");
    const truncatedWords = isTruncated
      ? words.slice(0, maxLines).join(" ")
      : words.join(" ");
    return `${truncatedWords}${isTruncated ? "..." : ""}`;
  };

  return (
    <div style={{ lineHeight: "1.5", marginBottom: "10px" }}>
      <p>{getTruncatedText()} {text.split(" ").length > maxLines && (
        <span
          style={{ cursor: "pointer",fontWeight:'bold' }}
          onClick={toggleTruncate}
        >
          {isTruncated ? "Show more" : "Show less"}
        </span>
      )}</p>
      
    </div>
  );
};

export default TruncatedText;
