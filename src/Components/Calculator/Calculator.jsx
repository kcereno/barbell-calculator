import classes from "./Calculator.module.scss";
import BarbellButtons from "./BarbellButtons/BarbellButtons";
import PlateSet from "./PlateSet/PlateSet";

export default function Calculator() {
  return (
    <div className={classes.container}>
      <div>
        <h3>Bar Weight</h3>
        <BarbellButtons />
        <h3>Available Plates</h3>
        <PlateSet />
        <h3>Target Weight</h3>
        <input type="number"></input>
        <h3>Actual Weight</h3>
        <h4>250 lbs</h4>
        <h3>Breakdown</h3>
        {/* Weight Input */}
        {/* Plattes */}
      </div>
    </div>
  );
}
