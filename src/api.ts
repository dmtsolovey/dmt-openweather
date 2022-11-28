import { LocationSearchResult } from "./models/OpenWeather";
import { Weather } from "./models/Weather";

const key: string = process.env.REACT_APP_WEATHER_API_KEY as string;

if (key === undefined) {
  throw new Error(
    "No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY"
  );
}

const keyQuery = `appid=${key}`;
const server = "https://api.openweathermap.org/data/2.5";

export async function getLocationByName(
  term: string
): Promise<LocationSearchResult> {
  const result = await fetch(
    `${server}/weather?q=${term}&${keyQuery}&units=metric`
  );
  if (result.status !== 200) throw new Error("Failed to read location data");
  return await result.json();
}

export async function readWeather(
  locationId: number | string
): Promise<LocationSearchResult> {
  const current = await fetch(
    `${server}/weather?id=${locationId}&${keyQuery}&units=metric`
  );
  if (current.status !== 200) throw new Error("Failed to read location data");
  return await current.json();
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
}

export async function readForecast(
  locationId: number | string
): Promise<Weather[]> {
  const forecast = await fetch(
    `${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=12`
  );
  if (forecast.status !== 200) throw new Error("Failed to read location data");
  return (await forecast.json()).list;
}
