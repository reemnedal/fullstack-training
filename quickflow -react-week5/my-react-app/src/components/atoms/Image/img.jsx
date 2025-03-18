import React from "react";
import "./image.css";  // Importing the image-specific styles

const Image = ({ src, alt }) => {
  return <img src={src} alt={alt} className="image" />;  // Apply the .image class here
};

export default Image;
