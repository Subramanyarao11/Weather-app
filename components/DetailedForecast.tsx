'use client';
import { convertToDate, formatTimeFromString, kelvinToCelsius, kelvinToFahrenheit } from '@/lib/dateUtils';
import IconComponent from './ui/icon-component';
import { useTemperature } from '@/lib/store/temp-context';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function DetailedForecast({ data }: any) {
  const { unit } = useTemperature();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="w-full h-full flex items-center justify-center py-6">
        <Loader />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Weather Icon</TableHead>
          <TableHead>Minimum Temperature</TableHead>
          <TableHead>Maximum Temperrature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Pressure</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.list.map((item: any, i: any) => (
          <TableRow key={i}>
            <TableCell> {i === 0 ? 'Today' : convertToDate(data.city.timezone, item.dt, 'short')}</TableCell>
            <TableCell>
              <p>{formatTimeFromString(item.dt_txt)}</p>
            </TableCell>
            <TableCell>
              <IconComponent weatherCode={item.weather[0].id} className=" h-8 w-8" />
            </TableCell>
            <TableCell>
              <p>
                {unit === 'C'
                  ? Math.floor(kelvinToCelsius(item.main.temp_min))
                  : Math.floor(kelvinToFahrenheit(item.main.temp_min))}
                <span>{unit === 'C' ? '\u00B0C' : '\u00B0F'}</span>
              </p>
            </TableCell>
            <TableCell>
              <p>
                {unit === 'C'
                  ? Math.floor(kelvinToCelsius(item.main.temp_max))
                  : Math.floor(kelvinToFahrenheit(item.main.temp_max))}
                <span>{unit === 'C' ? '\u00B0C' : '\u00B0F'}</span>
              </p>
            </TableCell>
            <TableCell>
              <p>{item.main.humidity}&deg;</p>
            </TableCell>
            <TableCell>
              <p>{item.main.humidity}hPa</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
