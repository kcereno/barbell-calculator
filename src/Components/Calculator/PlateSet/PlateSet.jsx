import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import styles from "./PlateSet.module.scss";

export default function PlateSet() {
  const { updateUserPlates, existsInUserPlateArr } = useContext(AppContext);
  const PLATE_ARR = [55, 45, 35, 25, 15, 10, 5, 2.5];

  const checkHandler = (e) => {
    let checkboxValue = e.target.value;
    updateUserPlates(checkboxValue);
  };

  const plates = PLATE_ARR.map((value) => {
    return (
      <div key={value} className={styles.checkbox}>
        <input
          type="checkbox"
          checked={existsInUserPlateArr(value)}
          onChange={checkHandler}
          value={value}
        />
        <label>{value}</label>
      </div>
    );
  });

  return <div className={styles.container}>{plates}</div>;
}
