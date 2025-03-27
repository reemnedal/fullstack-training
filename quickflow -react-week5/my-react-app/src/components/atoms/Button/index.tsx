import React from "react";
import styles from "./Button.module.css"; // Import CSS Module for Button

interface ButtonProps {
  text: string;
  label: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
