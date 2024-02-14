export function convertToDate(timezone: number, dt: number, weekdayFormat: 'short' | 'long'): string {
  let utc_time = new Date(dt * 1000);
  let local_time = new Date(utc_time.getTime() + timezone * 1000);

  const options = { weekday: weekdayFormat };
  const dateFormatter = new Intl.DateTimeFormat('UTC', options);

  return dateFormatter.format(local_time);
}

export function formatSunTimeWithAMPM(timestamp: number, timezoneOffset: number): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
  return formattedTime;
}

export function kelvinToCelsius(kelvin: number): number {
  if (kelvin < 0) {
    throw new Error('Temperature cannot be negative in Kelvin');
  }

  return kelvin - 273.15;
}

// Function to convert Kelvin to Fahrenheit
export function kelvinToFahrenheit(kelvin: number): number {
  if (kelvin < 0) {
    throw new Error('Temperature cannot be negative in Kelvin');
  }

  return (kelvin - 273.15) * (9 / 5) + 32;
}
