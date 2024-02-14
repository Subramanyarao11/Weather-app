'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
export function SearchBar() {
  const router = useRouter();
  const { toast } = useToast();
  const [cityName, setCityName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cityName.length < 5) {
      toast({
        title: 'City name too short',
        description: 'There was a problem with your request.',
      });
      return;
    }

    setIsSubmitting(true);

    const key = process.env.NEXT_PUBLIC_APPID as string;
    try {
      const geocodingResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`,
      );

      if (geocodingResponse.status === 404) {
        throw new Error('Geocoding API returned 404');
      }

      const [geocodingData] = await geocodingResponse.json();
      const latitude = geocodingData.lat;
      const longitude = geocodingData.lon;
      router.push(`/search?lat=${latitude}&lon=${longitude}&city=${cityName}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Invalid City Name',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <Input
            type="text"
            id="city"
            disabled={isSubmitting}
            onChange={(e) => {
              setCityName(e.target.value);
            }}
            placeholder="Enter a city..."
          />
          <div className="inline-flex items-center justify-center w-full">
            <Button disabled={isSubmitting} type="submit">
              Search
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
