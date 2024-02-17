export const getForecastData = async ({ lat, lon }: { lat: string; lon: string }) => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APPID}`,
  );
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.json();
};
