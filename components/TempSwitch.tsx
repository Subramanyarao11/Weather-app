'use client';
import React, { useState, useEffect } from 'react';
import { useTemperature } from '../lib/store/temp-context';
import { kelvinToCelsius, kelvinToFahrenheit, formatTemperature } from '../lib/dateUtils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function TempSwitch() {
  const { unit, toggleUnit } = useTemperature();

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
    </div>
  );
}

export default TempSwitch;
