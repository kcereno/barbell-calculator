import classes from "./BarbellButtons.module.scss";
import BarbellButton from "./BarbellButton/BarbellButton";

export default function BarbellButtons(props) {
  return (
    <div className={classes.container}>
      <BarbellButton value={35} />
      <BarbellButton value={45} />
      <BarbellButton value={60} />
    </div>
  );
}
