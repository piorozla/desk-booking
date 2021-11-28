import { createContext, useEffect, useState } from 'react';
import dataFile from './db.json';

export const DBContext = createContext();

export function DBProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dataFile);
    setLoading(false);
  }, []);

  const editDesk = ({ area, desknumber, am, pm }) => {
    const updatedData = { ...data };
    updatedData.areas[area] = updatedData.areas[area] || {};
    updatedData.areas[area].desks = updatedData.areas[area].desks || {};
    updatedData.areas[area].desks[desknumber] = {
      am,
      pm,
    };
    setData(updatedData);
  };

  return (
    <DBContext.Provider value={{ data, loading, editDesk }}>
      {children}
    </DBContext.Provider>
  );
}
