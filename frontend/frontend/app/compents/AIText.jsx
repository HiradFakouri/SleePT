"use client";

import { useState, useEffect } from "react";

export const AIText = ({ text, classname = "" }) => {
  <div classname={classname}>{text}</div>
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div
      className="p-2 bg-[#f2b4a6] text-[#824f4f] rounded-xl rounded-tl-none transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      {displayedText}
    </div>
  );
};

export { AIText };