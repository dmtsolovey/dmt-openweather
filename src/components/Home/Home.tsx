import LocationCard from "../Locations/Locations";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./Home.module.scss";

export default function Home(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <SearchInput />
      <LocationCard />
    </div>
  );
}
