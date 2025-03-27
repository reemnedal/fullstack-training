import React from "react";
import Text from "../../atoms/Text/index.jsx";
import Button from "../../atoms/Button/index.jsx";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Get in Touch</h1>
        <Text className="contact-description">
          Have questions or need assistance? Reach out to us! We're here to help
          you streamline your workflows with QuiqFlow.
        </Text>
        <Text className="contact-details">📍 Address: Amman,Jordan</Text>
        <Text className="contact-details">📧 Email: support@quiqflow.com</Text>
        <Text className="contact-details">📞 Phone:+962 7996 60030</Text>
        <Button
          text="Contact Us"
          onClick={() => window.open("https://quiqflow.com", "_blank")}
        />
      </div>
    </div>
  );
};

export default Contact;
