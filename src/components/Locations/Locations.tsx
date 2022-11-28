import { Alert, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LocationCard from "../LocationCard/LocationCard";
import styles from "./Locations.module.scss";

export default function Locations(): JSX.Element | null {
  const locations = useSelector((state: RootState) => state.locations.items);
  return (
    <>
      {!!locations.length && (
        <div className={styles.wrapper}>
          <div className={styles.alert}>
            <Alert
              severity="info"
              icon={false}
              variant="outlined"
              sx={{
                color: "white",
                padding: "10px",
                fontSize: "20px",
                border: "none",
                fontFamily: "Poppins",
              }}
            >
              Choose a city and see the weather in detail
            </Alert>
          </div>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {locations.map((location) => (
              <Grid item key={location.id} xs={3}>
                <LocationCard key={location.id} location={location} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
