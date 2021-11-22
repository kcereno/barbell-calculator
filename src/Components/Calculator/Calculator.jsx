import classes from "./Calculator.module.scss";
import BarbellButtons from "./BarbellButtons/BarbellButtons";
import PlateSet from "./PlateSet/PlateSet";
import Breakdown from "./Breakdown/Breakdown";
import { useContext, useEffect } from "react";
import AppContext from "../../store/AppContext";

export default function Calculator() {
  const {
    targetWeight,
    setTargetWeight,
    loadout,
    calculateLoadout,
    totalWeight,
    calculateTotalWeight,
  } = useContext(AppContext);

  useEffect(() => {
    calculateTotalWeight();
  }, [loadout, calculateTotalWeight]);

  const inputChangeHandler = (e) => {
    let newVal = e.target.value;
    setTargetWeight(newVal);
  };
  const calculateButtonClickHandler = () => {
    calculateLoadout();
  };

  return (
    <div className={classes.container}>
      <div>
        <h3>Bar Weight</h3>
        <BarbellButtons />
        <h3>Available Plates</h3>
        <PlateSet />
        <h3>Target Weight</h3>
        <input
          type="number"
          onChange={inputChangeHandler}
          value={targetWeight}
        />
        <button onClick={calculateButtonClickHandler}>Calculate</button>
        <h3>Actual Weight</h3>
        <h4>{totalWeight} lbs</h4>
        <h3>Breakdown</h3>
        <Breakdown />
        {/* Weight Input */}
        {/* Plattes */}
      </div>
    </div>
  );
}
