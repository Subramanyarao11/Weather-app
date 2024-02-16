'use client';
import React, { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext({
  unit: 'C',
  toggleUnit: () => {},
});

export function useTemperature() {
  return useContext(TemperatureContext);
}

export const TemperatureProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState('C');
  const toggleUnit = () => {
    setUnit((currentUnit) => (currentUnit === 'C' ? 'F' : 'C'));
  };

  return <TemperatureContext.Provider value={{ unit, toggleUnit }}>{children}</TemperatureContext.Provider>;
};
