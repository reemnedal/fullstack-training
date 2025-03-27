import React from "react";
import styles from "./loader.module.css"; // Importing the loader-specific styles as a CSS Module

const Loader: React.FC = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
