import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  color: "red" | "blue" | "green" | "yellow" | "purple" | "default";
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  return (
    <span className={`${styles.badge} ${styles[`badge-${color}`]}`}>
      {children}
    </span>
  );
};

export default Badge;
