export const config = {
  freight: {
    color: '#efc9b3', // color of the backgroud for an area
    displayName: 'Freight', // name displayed on the area, can be a string or an array of strings (lines)
    start: {
      // top left corner of the area
      x: 250,
      y: 15,
    },
    size: {
      // width (x) and length (y) of the area
      width: 80,
      height: 130,
    },
    // populate manually with numbers or
    // use Array.from(Array(10).keys()).map(n => n+ 20) where '10' is thetqy of desks
    // and '20' is the starting number
    desks: [5, 6, 7, 8, 9, 10],
  },
  ipcre: {
    color: '#00fae978',
    displayName: 'IP & CRE',
    start: {
      x: 150,
      y: 15,
    },
    size: {
      width: 80,
      height: 130,
    },
    desks: Array.from(Array(4).keys()).map((n) => n + 1),
  },
  support: {
    color: '#00f01869',
    displayName: ['Support', 'functionss'],
    start: {
      x: 350,
      y: 15,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(50).keys()).map((n) => n + 11),
  },
  gpmo: {
    color: '#fa6f058c',
    displayName: 'GPMO',
    start: {
      x: 530,
      y: 15,
    },
    size: {
      width: 240,
      height: 130,
    },
    desks: Array.from(Array(15).keys()).map((n) => n + 66),
  },
  asset: {
    color: '#f2020282',
    displayName: 'asset',
    start: {
      x: 150,
      y: 150,
    },
    size: {
      width: 320,
      height: 130,
    },
    desks: Array.from(Array(40).keys()).map((n) => n + 82),
  },
};
