import React from "react";
import styles from "./image.module.css"; // Importing the image-specific styles as a CSS Module

interface ImageProps {
  src: string; // Type for the image source
  alt: string; // Type for the image alt text
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.image} />; // Apply the .image class from the module
};

export default Image;
