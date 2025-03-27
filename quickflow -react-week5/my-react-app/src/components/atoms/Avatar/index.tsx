import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  src?: string; // `src` is optional because it can be undefined
}

const Avatar: React.FC<AvatarProps> = ({ name, src }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      className={styles.avatar} // Use CSS module class here
    />
  ) : (
    <div className={styles.avatar + " " + styles.avatarInitials}>
      {" "}
      {/* Apply multiple styles */}
      {initials}
    </div>
  );
};

export default Avatar;
