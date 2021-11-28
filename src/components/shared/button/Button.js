import React from 'react';
import './Button.css';

export default function Button({ name, ...props }) {
  return (
    <button className="button-wrapper" {...props}>
      <span>{name}</span>
    </button>
  );
}
