interface searchParamsProps {
  lat: string;
  lon: string;
}
export default async function SearchPage({ searchParams }: { searchParams: searchParamsProps }) {
  return (
    <div className="text-2xl">
      {searchParams.lat}
      {searchParams.lon}
    </div>
  );
}
