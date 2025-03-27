import React, { ReactNode } from "react";
import styles from "./text.module.css"; // Import the CSS module

interface TextProps {
  children: ReactNode;
  className?: string; // Optional className prop for custom styling
}

const Text: React.FC<TextProps> = ({ children, className = "" }) => {
  return <p className={`${styles.text} ${className}`}>{children}</p>;
};

export default Text;
