import { getAirPolData } from '@/actions/getAirPolData';
import { getData } from '@/actions/getData';
import TempSwitch from '@/components/TempSwitch';
import Weather from '@/components/Weather';
import WeatherWidgets from '@/components/WeatherWidget';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface searchParamsProps {
  lat: string;
  lon: string;
  city: string;
}

export async function generateMetadata({ searchParams }: { searchParams: searchParamsProps }): Promise<Metadata> {
  const { city } = searchParams;

  return {
    title: `${city} - Weather Forecast`,
    description: `${city} weather forecast with current conditions, wind, air quality, among other details.`,
  };
}

interface searchParamsProps {
  lat: string;
  lon: string;
}
export default async function SearchPage({ searchParams }: { searchParams: searchParamsProps }) {
  const { lat, lon } = searchParams;

  const dataRequest = await getData({ lat, lon });

  const airDataRequest = await getAirPolData({ lat, lon });

  const [data, air_pollution] = await Promise.all([dataRequest, airDataRequest]);

  if (!data || !air_pollution) return notFound();

  return (
    <>
      <div className="flex center justify-center my-4">
        <TempSwitch />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <Weather data={data} />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets data={data} airQuality={air_pollution.list[0]} />
        </section>
      </div>
    </>
  );
}
