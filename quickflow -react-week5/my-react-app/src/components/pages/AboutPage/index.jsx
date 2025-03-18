import React from "react";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About QuiqFlow</h1>
        <Text className="about-description">
          QuiqFlow is an innovative company dedicated to simplifying workflow automation. Our mission is to provide seamless and intuitive solutions that enhance efficiency, optimize operations, and drive business growth. 
        </Text>
        <Text className="about-description">
          With QuiqFlow, businesses can automate repetitive tasks, streamline processes, and focus on what truly matters. Our cutting-edge technology ensures seamless integration and maximum productivity.
        </Text>
        <Text className="about-description">
          Join us in transforming the way businesses operate. Experience the power of automation with QuiqFlow today.
        </Text>
        <Button text="Learn More" onClick={() => window.open("https://quiqflow.com/", "_blank")} />
      </div>
    </div>
  );
};

export default About;
