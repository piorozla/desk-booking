import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { config } from '../../../config/map';
import { DBContext } from '../../../db/useDb';

const generateDesks = (desks, start, size, areaId, data) => {
  const deskWidth = 10;
  const deskHeight = 10;
  const desksTopMargin = 40; // leave space at the top of an aread for label
  const desksLeftMargin = 10;
  const gap = 5;

  // how many vertical/horizontal lines of desks can we squeeze?
  const vertLines = parseInt(
    (size.height - desksTopMargin) / (deskHeight + gap) - 1
  );
  let horLines = parseInt((size.width - desksLeftMargin) / (deskWidth + gap));
  // remove 3rd as we're making a gap every 2rd row
  horLines -= parseInt(horLines / 3);

  let deskDrawings = [];

  if (vertLines > 0 && horLines > 0) {
    let vert = 1; // current vertical line
    let hor = 0; // current horizontal line
    // if there is too many to draw, fit to area and add ... at the end
    const tooManyToDraw = desks.length > vertLines * horLines;
    const qtyToDraw = tooManyToDraw ? vertLines * horLines : desks.length;

    for (let i = 1; i <= qtyToDraw; i++) {
      // top left corner of a desk
      let startDeskX = start.x + desksLeftMargin + hor * deskWidth;
      let startDeskY = start.y + desksTopMargin + vert * deskHeight;

      // draw ... if it's the last desk to draw and we have too many in an area
      if (tooManyToDraw && i === qtyToDraw) {
        deskDrawings.push(
          <circle
            id={'desk...' + i + areaId}
            key={'desk...' + i + areaId}
            cx={parseInt(startDeskX) + gap * hor + deskWidth / 5}
            cy={parseInt(startDeskY) + gap * vert + deskHeight / 2}
            r="1"
            stroke="black"
            fill="white"
          />
        );
        deskDrawings.push(
          <circle
            id={'desk...2' + i + areaId}
            key={'desk...2' + i + areaId}
            cx={parseInt(startDeskX) + gap * hor + (deskWidth * 3) / 5}
            cy={parseInt(startDeskY) + gap * vert + deskHeight / 2}
            r="1"
            stroke="black"
            fill="white"
          />
        );
        deskDrawings.push(
          <circle
            id={'desk...3' + i + areaId}
            key={'desk...3' + i + areaId}
            cx={parseInt(startDeskX) + gap * hor + deskWidth}
            cy={parseInt(startDeskY) + gap * vert + deskHeight / 2}
            r="1"
            stroke="black"
            fill="white"
          />
        );
      } else {
        // mark desk as fully  (red) or partialy booked (orange)
        let fill = '#61ff61';
        if (data?.areas && data?.areas[areaId]) {
          const deskData = data?.areas[areaId].desks[desks[i - 1]];
          if (deskData && (deskData.am || deskData.pm)) {
            fill = 'orange';
          }
          if (deskData && deskData.am && deskData.pm) {
            fill = 'red';
          }
        }
        deskDrawings.push(
          <path
            id={'desk' + i + areaId}
            key={'desk' + i + areaId}
            fill={fill}
            stroke="black"
            d={
              'M' +
              (parseInt(startDeskX) + gap * hor) +
              ' ' +
              (parseInt(startDeskY) + gap * vert) +
              ' H' +
              (parseInt(startDeskX) + deskWidth + gap * hor) +
              ' V' +
              (parseInt(startDeskY) + deskHeight + gap * vert) +
              ' H' +
              (parseInt(startDeskX) + gap * hor) +
              ' Z'
            }
          />
        );
      }

      // reset vertical line counter if it's the last desk in a row
      vert = vert === vertLines ? 1 : vert + 1;
      // if vertical line got reset to 1, increase horizontal lines
      hor = vert === 1 ? hor + 1 : hor;
      // make a gap every 3rd row
      hor = hor > 0 && (hor + 1) % 3 === 0 ? hor + 1 : hor;
    }
  }
  return deskDrawings;
};

const generateAreas = (config, handleClick, data) => {
  return Object.entries(config).map(([id, area]) => {
    const { color, start, size, displayName, desks } = area;
    const deskDrawings = generateDesks(desks, start, size, id, data);

    return (
      // wrap svg area with anchor to add links to it
      <a key={id} onClick={() => handleClick(id)}>
        {/* add filled square for the area */}
        <path
          id={id}
          fill={color}
          d={`M${start.x} ${start.y} H${start.x + size.width} V${
            start.y + size.height
          } H${start.x} Z`}
        />
        {/* add label (check if it's a multi line) */}
        <text x={start.x + 10} y={start.y + 20} fontSize="1rem" fill="black">
          {Array.isArray(displayName)
            ? displayName.map((line, index) => {
                return (
                  <tspan
                    key={index}
                    x={start.x + 10}
                    y={start.y + 20 + 20 * index}
                  >
                    {line}
                  </tspan>
                );
              })
            : displayName}
        </text>
        {/* add desks */}
        {deskDrawings}
      </a>
    );
  });
};

export default function Map() {
  const navigate = useNavigate();
  const { data } = useContext(DBContext);

  function handleClick(id) {
    navigate(`/${id}`);
  }

  return (
    <svg id="map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 500">
      <path
        id="outline"
        stroke="black"
        strokeWidth="5"
        d="M5 5 H800 V50 H1295 V495 H50 V150 H5 Z"
        fill="none"
      />
      {generateAreas(config, handleClick, data)}
    </svg>
  );
}
