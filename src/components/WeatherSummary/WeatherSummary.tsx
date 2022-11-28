import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { readForecast } from "../../api";
import { Weather } from "../../models/Weather";
import { RootState } from "../../store";
import WeatherEntry from "../WeatherEntry/WeatherEntry";
import styles from "./WeatherSummary.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function WeatherSummary(): JSX.Element | null {
  const [forecast, setForecast] = useState<Weather[]>([]);
  const { id = "" } = useParams<"id">();
  const location = useSelector((state: RootState) =>
    state.locations.items.find((item) => item.id === +id)
  );

  useEffect(() => {
    (async function () {
      if (id) {
        const forecast = await readForecast(id);
        setForecast(forecast);
      }
    })();
  }, [id]);

  if (!location) return <div>OOPS! Not found</div>;

  return (
    <div className={styles.wrapper}>
      <Link to={"/"}>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            border: "1px solid white",
            ":hover": {
              border: "1px solid transparent",
            },
          }}
          className={styles.backBtn}
        >
          <ArrowBackIosIcon /> Back
        </Button>
      </Link>
      <div className={styles.entryDetails}>
        <Typography variant="h2" className={styles.locationName}>
          {location.name}, {location.sys.country}
        </Typography>
      </div>
      <WeatherEntry
        weather={location}
        timeStamp={false}
        wind={location.wind.speed}
        rowDirection
      />
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className={styles.forecastList}
        >
          {forecast.map((hourlyForecast) => (
            <Grid item key={hourlyForecast.dt} xs={2}>
              <WeatherEntry
                weather={hourlyForecast}
                timeStamp
                wind={location.wind.speed}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
