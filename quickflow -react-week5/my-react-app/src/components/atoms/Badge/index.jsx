import React from 'react';
import './Badge.css';

const Badge = ({ children, color }) => {
  return (
    <span className={`badge badge-${color || 'default'}`}>
      {children}
    </span>
  );
};

export default Badge;