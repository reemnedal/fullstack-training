import React from "react";
import "./text.css";

const Text = ({ children, className }) => {
  return <p className={`text ${className}`}>{children}</p>;
};

export default Text;
