import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Zoom.css';

export default function Zoom({
  handleClickPlus,
  handleClickMinus,
  handleReset,
}) {
  return (
    <div id="zoom-wrapper">
      <FontAwesomeIcon
        icon={faSearchPlus}
        size="lg"
        onClick={handleClickPlus}
      />
      <FontAwesomeIcon
        icon={faSearchMinus}
        size="lg"
        onClick={handleClickMinus}
      />
      <div onClick={handleReset}>Reset</div>
    </div>
  );
}
