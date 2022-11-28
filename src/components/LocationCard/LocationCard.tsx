import { Button } from "@mui/material";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { locationActions } from "../../features/locations/locations";
import { LocationSearchResult } from "../../models/OpenWeather";
import { AppDispatch } from "../../store";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./LocationCard.module.scss";
import { RefreshOutlined } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { updateLocation } from "../../features/locations/updateLocation";

interface LocationCardProps {
  location: LocationSearchResult;
}

export default function LocationCard({
  location,
}: LocationCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(locationActions.delete(location.id));
  };

  const onRefresh = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateLocation(location.id));
  };

  return (
    <Link to={`/location/${location.id}`} className={styles.wrapper}>
      <span className={styles.locationName}>
        <LocationOnIcon /> {location.name}
      </span>
      <span className={styles.mainTemp}>{Math.round(location.main.temp)}°</span>
      <span>Feels like: {Math.round(location.main.feels_like)}°</span>
      <span>{location.weather[0].main}</span>
      <span>Visibility: {location.visibility} m</span>
      <span>{`min.: ${Math.round(location.main.temp_min)}°, 
       max.: ${Math.round(location.main.temp_max)}°`}</span>
      <Button
        onClick={onDelete}
        sx={{
          color: "white",
          position: "absolute",
          right: 0,
          top: 8,
        }}
      >
        <CloseIcon />
      </Button>
      <Button
        size="large"
        sx={{
          color: "white",
          border: "none",
          padding: 0,
          marginTop: 2,
        }}
        endIcon={<RefreshOutlined />}
        variant="text"
        onClick={onRefresh}
      />
    </Link>
  );
}
