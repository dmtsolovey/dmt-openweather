import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { searchLocation } from "../../features/locations/searchLocation";
import { AppDispatch, RootState } from "../../store";
import styles from "./SearchInput.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchInput(): JSX.Element {
  const [locationSearch, setLocationSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const addLocation = () => {
    dispatch(searchLocation(locationSearch));
    setLocationSearch("");
  };
  const hasError = useSelector((state: RootState) => state.locations.error);
  const pending = useSelector((state: RootState) => state.locations.loading);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="addLocation" className={styles.label}>
        <TextField
          error={hasError}
          id="addLocation"
          variant="outlined"
          autoComplete="off"
          label="Add the city"
          value={locationSearch}
          onChange={(e: any) => setLocationSearch(e.target.value)}
          InputLabelProps={{
            style: {
              color: "#fff",
            },
          }}
          InputProps={{ className: styles.input }}
        />
        {hasError && <p className={styles.error}>Something went wrong</p>}
      </label>
      <Button
        onClick={addLocation}
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          fontFamily: "Poppins",
          ":hover": { borderColor: "transparent" },
        }}
      >
        {pending ? <CircularProgress color="inherit" size={20} /> : "Search"}
      </Button>
    </div>
  );
}
