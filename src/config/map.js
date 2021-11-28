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
    displayName: 'Asset',
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
  gis: {
    color: '#f7ff1abf',
    displayName: 'GIS',
    start: {
      x: 480,
      y: 150,
    },
    size: {
      width: 320,
      height: 130,
    },
    desks: Array.from(Array(47).keys()).map((n) => n + 123),
  },
  ecom: {
    color: '#2df50082',
    displayName: 'ECOM',
    start: {
      x: 810,
      y: 150,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(24).keys()).map((n) => n + 171),
  },
  trade: {
    color: '#f5000061',
    displayName: 'Trade',
    start: {
      x: 150,
      y: 350,
    },
    size: {
      width: 80,
      height: 130,
    },
    desks: Array.from(Array(4).keys()).map((n) => n + 195),
  },
  product: {
    color: '#f5d80069',
    displayName: ['Product', 'SM,LT,GJ,AMc'],
    start: {
      x: 240,
      y: 350,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(26).keys()).map((n) => n + 199),
  },
  hr: {
    color: '#00f5f582',
    displayName: ['Human', 'Resources'],
    start: {
      x: 410,
      y: 350,
    },
    size: {
      width: 100,
      height: 130,
    },
    desks: Array.from(Array(8).keys()).map((n) => n + 225),
  },
  mktg: {
    color: '#04f50082',
    displayName: 'Mktg',
    start: {
      x: 520,
      y: 350,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(16).keys()).map((n) => n + 232),
  },
  mktg2: {
    color: '#04f50082',
    displayName: 'Mktg',
    start: {
      x: 780,
      y: 350,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(27).keys()).map((n) => n + 248),
  },
  comms: {
    color: '#f58b0082',
    displayName: 'Comms',
    start: {
      x: 690,
      y: 350,
    },
    size: {
      width: 80,
      height: 130,
    },
    desks: Array.from(Array(2).keys()).map((n) => n + 246),
  },
  finance: {
    color: '#e0f500b5',
    displayName: 'Finance',
    start: {
      x: 950,
      y: 350,
    },
    size: {
      width: 160,
      height: 130,
    },
    desks: Array.from(Array(26).keys()).map((n) => n + 270),
  },
};
