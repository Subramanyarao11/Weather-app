'use client';
import { Card } from '@/components/ui/card';
import Clock from '../components/ui/clock';
import { convertToDate, formatTemperature, kelvinToCelsius, kelvinToFahrenheit } from '../lib/dateUtils';
import IconComponent from '../components/ui/icon-component';
import { useTemperature } from '../lib/store/temp-context';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useContext } from 'react';
import { authContext } from '@/lib/store/auth-context';
import { toast } from './ui/use-toast';
const favouritesRef = collection(db, 'favourites');

interface CurrentWeatherProps {
  data: any;
  lat: string;
  lon: string;
}

export default function Weather({ data, lat, lon }: CurrentWeatherProps) {
  const { unit } = useTemperature();
  const { user } = useContext(authContext);

  const handleSave = async () => {
    try {
      await addDoc(favouritesRef, {
        userId: user?.uid,
        locations: { latitude: lat, longitude: lon },
      });
      toast({
        title: 'Added to favourites',
        description: 'You can view your favourite locations in the dashboard',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        title: 'Error',
        description: 'Failed to add location to favourites',
      });
    }
  };
  const temp = data.main.temp;
  const temperature = unit === 'C' ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);
  const initial = new Date();

  return (
    <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden md:h-[25rem]">
      <div className="absolute " />
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{convertToDate(data.timezone, data.dt, 'long')}</span>
          <Clock initial={initial} timezone={data.timezone} />
        </div>
        <div className="text-md mt-2 flex font-bold">
          <span>{data.name}</span>
          <i>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 h-4 w-4 fill-none stroke-black dark:stroke-white"
            >
              <path
                d="M7.39993 6.32003L15.8899 3.49003C19.6999 2.22003 21.7699 4.30003 20.5099 8.11003L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23003 7.39993 6.32003Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1101 13.6501L13.6901 10.0601"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">{formatTemperature(temperature, unit)}</div>
      <div className="flex justify-between items-center p-2">
        <div>
          <IconComponent weatherCode={data.weather[0].id} className="h-9 w-9" />
          <div className="font-semibold">{data.weather[0].main}</div>
          <div className="flex gap-2 dark:text-neutral-500">
            <span>H: {Math.round(kelvinToCelsius(data.main.temp_max))}&deg;</span>
            <span>L: {Math.round(kelvinToCelsius(data.main.temp_min))}&deg;</span>
          </div>
        </div>
        {user && (
          <div>
            <Button onClick={handleSave}>
              <span className="text-sm md:hidden">
                <Heart />
              </span>
              <span className="hidden md:inline-block">Add to favourites</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
