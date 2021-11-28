import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import './Header.css';

export default function Header() {
  return (
    <div id="header-wrapper">
      <h1>Awesome Desk Booking</h1>
      <Link to="/">
        <Button name="Floor 1" />
      </Link>
    </div>
  );
}
