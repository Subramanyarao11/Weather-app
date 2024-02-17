import { getForecastData } from '@/actions/getForecastData';
import DetailedForecast from '@/components/DetailedForecast';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface searchParamsProps {
  lat: string;
  lon: string;
  city: string;
}

export async function generateMetadata({ searchParams }: { searchParams: searchParamsProps }): Promise<Metadata> {
  const { city } = searchParams;
  return {
    title: `${city} - Detailed Weather Forecast`,
    description: `${city} detailed weather forecast with current conditions, wind, air quality, among other details.`,
  };
}
export default async function DetailsPage({ searchParams }: { searchParams: searchParamsProps }) {
  const { lat, lon } = searchParams;

  const forecast = await getForecastData({ lat, lon });
  const data = await forecast;

  if (!data) return notFound();
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <DetailedForecast data={data} />
      </div>
    </>
  );
}
