import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { config } from '../../config/map';
import { DBContext } from '../../db/useDb';
import AreaModal from '../shared/modal/AreaModal';
import Zoom from '../shared/zoom/Zoom';
import './Area.css';

const generateLayout = (desks, color, deskData, handleDeskClick) => {
  const initialSVGWidth = 1000; // max horizontal svg size
  const initialSVGHeight = 600; // max vertical svg size
  const qtyPerRow = 4; // how many desks vertically
  // how many can we squeeze horizontally (leaving every 3rd row empty)
  const qtyRows =
    Math.ceil(desks.length / qtyPerRow) +
    Math.ceil(desks.length / qtyPerRow / 2) -
    1;
  const spacing = 20; // default spacing betwen desks
  const deskWidth = parseInt(
    (initialSVGWidth - (qtyRows + 1) * spacing) / qtyRows
  );
  const deskHeight = parseInt(
    (initialSVGHeight - (qtyPerRow + 1) * spacing) / qtyPerRow
  );
  // we'll get the smaller size so that we can fit it all vertically and horizontally
  const deskSize = deskWidth > deskHeight ? deskHeight : deskWidth;

  // cut spare svg space at the bottom
  const svgWidth = deskSize * qtyRows + (qtyRows + 1) * spacing;
  const svgHeight = deskSize * qtyPerRow + (qtyPerRow + 1) * spacing;

  return (
    <svg
      id="map"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 ' + svgWidth + ' ' + svgHeight}
    >
      <path d={'M0 0 H' + svgWidth + ' V' + svgHeight + ' H0 Z'} fill={color} />
      {desks.map((desk, index) => {
        // make every 3rd row empty
        let modifier = 0;
        if (parseInt(index / 4) > 1) {
          modifier = parseInt(parseInt(index / 4) / 2) * (deskSize + spacing); //01 =0 23=1 45=2 67=3
        }

        const x =
          spacing + parseInt(index / 4) * (deskSize + spacing) + modifier;
        const y = spacing + (index % qtyPerRow) * (deskSize + spacing);
        let bookedSlots = [];
        if (deskData[desk]) {
          if (deskData[desk].am) {
            bookedSlots.push(
              <path
                key={index + 'desk-slot-am'}
                d={
                  'M' +
                  (x + 1) +
                  ' ' +
                  (y + 1) +
                  ' H' +
                  (x + deskSize - 1) +
                  ' V' +
                  (y + deskSize / 2) +
                  ' H' +
                  (x + 1) +
                  ' Z'
                }
                fill="#ff7070"
              />
            );
          }
          if (deskData[desk].pm) {
            bookedSlots.push(
              <path
                key={index + 'desk-slot-pm'}
                d={
                  'M' +
                  (x + 1) +
                  ' ' +
                  (y + deskSize / 2 - 1) +
                  ' H' +
                  (x + deskSize - 1) +
                  ' V' +
                  (y + deskSize - 1) +
                  ' H' +
                  (x + 1) +
                  ' Z'
                }
                fill="#ff7070"
              />
            );
          }
        }
        return [
          <path
            onClick={() => handleDeskClick(desk, deskData)}
            key={index + 'desk'}
            d={
              'M' +
              x +
              ' ' +
              y +
              ' H' +
              (x + deskSize) +
              ' V' +
              (y + deskSize) +
              ' H' +
              x +
              ' Z'
            }
            fill="#61ff61"
            stroke="black"
          />,
          ...bookedSlots,
          <text
            onClick={() => handleDeskClick(desk, deskData)}
            key={index + 'label'}
            x={x + deskSize / 2}
            y={y + deskSize / 2 + 1}
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={deskSize / 2 + 'px'}
          >
            {desk}
          </text>,
        ];
      })}
    </svg>
  );
};

export default function Area() {
  const { id } = useParams();
  const { data, loading } = useContext(DBContext);
  const [size, setSize] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  if (loading) {
    return <div>Loading...</div>;
  }
  let deskData = {};
  if (data.areas[id]) {
    deskData = data.areas[id].desks;
  }
  const { color, desks } = config[id];

  function handleClickPlus() {
    setSize((prevSize) => prevSize + 20);
  }
  function handleClickMinus() {
    setSize((prevSize) => prevSize - 20);
  }
  function handleReset() {
    setSize(100);
  }
  function handleDeskClick(desk, deskData) {
    setShowModal(true);
    setModalData({ desk, deskData: deskData[desk], area: id });
  }

  return (
    <>
      <AreaModal show={showModal} setShow={setShowModal} deskData={modalData} />
      <Zoom
        handleClickPlus={handleClickPlus}
        handleClickMinus={handleClickMinus}
        handleReset={handleReset}
      />

      <div id="area-wrapper" style={{ width: size + 'vw' }}>
        <h2>Desks for {id}</h2>
        {generateLayout(desks, color, deskData, handleDeskClick)}
      </div>
    </>
  );
}
