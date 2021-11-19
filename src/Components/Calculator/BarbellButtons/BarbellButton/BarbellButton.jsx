import { useContext } from "react";
import AppContext from "../../../../store/AppContext";
import style from "./BarbellButton.module.scss";

export default function BarbellButton(props) {
  const { value } = props;
  const { barWeight, setBarWeight } = useContext(AppContext);

  const isActive = () => {
    return value === barWeight;
  };

  let classes = `${style.container}`;

  if (isActive()) {
    classes = `${style.container} ${style.active}`;
  }

  const buttonClickHandler = (e) => {
    setBarWeight(value);
  };

  return (
    <div className={classes}>
      <button onClick={buttonClickHandler}>{value}</button>
    </div>
  );
}
