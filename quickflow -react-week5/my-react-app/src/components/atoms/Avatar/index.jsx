import React from 'react';
import './Avatar.css';

const Avatar = ({ name, src }) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      className="avatar"
    />
  ) : (
    <div className="avatar avatar-initials">
      {initials}
    </div>
  );
};

export default Avatar;