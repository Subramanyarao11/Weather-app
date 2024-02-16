'use client';
import React, { useState, useEffect } from 'react';
import { useTemperature } from '../lib/store/temp-context';
import { kelvinToCelsius, kelvinToFahrenheit, formatTemperature } from '../lib/dateUtils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function TempSwitch({ kelvin = 284.18 }) {
  const { unit, toggleUnit } = useTemperature();

  // Convert temperature based on the current unit
  const temperature = unit === 'C' ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);

  // Determine the checked state for the switch
  const [isChecked, setIsChecked] = useState(unit === 'F');

  // Update internal switch state when unit changes
  useEffect(() => {
    setIsChecked(unit === 'F');
  }, [unit]);

  // Handle switch toggle
  const handleToggleUnit = () => {
    toggleUnit();
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id="temperature-toggle" checked={isChecked} onCheckedChange={handleToggleUnit} />
      <Label className="text-lg font-semibold" htmlFor="temperature-toggle">
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Label>
      {/* <span>{formatTemperature(temperature, unit)}</span> */}
    </div>
  );
}

export default TempSwitch;
