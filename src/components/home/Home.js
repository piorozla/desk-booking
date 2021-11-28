import React, { useState } from 'react';
import Zoom from '../shared/zoom/Zoom';
import Map from './map/Map';

export default function Home() {
  const [size, setSize] = useState(100);

  function handleClickPlus() {
    setSize((prevSize) => prevSize + 20);
  }
  function handleClickMinus() {
    setSize((prevSize) => prevSize - 20);
  }
  function handleReset() {
    setSize(100);
  }
  return (
    <>
      <Zoom
        handleClickPlus={handleClickPlus}
        handleClickMinus={handleClickMinus}
        handleReset={handleReset}
      />
      <div id="map-wrapper" style={{ width: size + 'vw' }}>
        <Map />;
      </div>
    </>
  );
}
