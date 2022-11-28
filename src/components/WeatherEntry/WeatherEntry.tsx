import { getIconUrl } from "../../api";
import { Weather } from "../../models/Weather";
import styles from "./WeatherEntry.module.scss";
import classNames from "classnames";

interface WeatherEntryProps {
  weather: Weather;
  timeStamp?: boolean;
  pressure?: boolean;
  feelsLike?: boolean;
  wind: number;
  rowDirection?: boolean;
}
function convertUtcTimeToDate(utcTime: number): Date {
  return new Date(utcTime * 1000);
}
export default function WeatherEntry({
  weather,
  wind,
  rowDirection = false,
  feelsLike = true,
  timeStamp = true,
}: WeatherEntryProps): JSX.Element {
  return (
    <div
      className={classNames(
        styles.wrapper,
        rowDirection && styles.rowDirection
      )}
    >
      {timeStamp && (
        <div className={styles.time}>
          {convertUtcTimeToDate(weather.dt).toLocaleTimeString()}
        </div>
      )}
      <div>
        <span className={styles.temp}>{Math.round(weather.main.temp)}°</span>
        {feelsLike && (
          <div>Feels like: {Math.round(weather.main.feels_like)}°</div>
        )}
        <div className={styles.minmaxTemp}>
          {`min.:${Math.round(weather.main.temp_min)}° / max.:${Math.round(
            weather.main.temp_max
          )}°`}
        </div>
      </div>
      <div>
        <div className={styles.humidity}>
          Humidity: {weather.main.humidity}%
        </div>
        <div className={styles.windSpeed}>
          Wind speed: {Math.round(wind)} km/h
        </div>
        <div className={styles.humidity}>
          Pressure: {weather.main.pressure} hPa
        </div>
      </div>

      {weather.weather.map((condition) => (
        <div key={condition.id} className={styles.imgAndMain}>
          <img
            src={getIconUrl(condition.icon)}
            alt={condition.main}
            width={150}
            draggable={false}
          />{" "}
          <span>{condition.description.toLocaleUpperCase()}</span>
        </div>
      ))}
    </div>
  );
}
