import { useContext } from "react";
import AppContext from "../../../../store/AppContext";
import styles from "./AddSubtractButtons.modules.scss";

export default function AddSubtractButtons(props) {
  const { updateLoadout } =
    useContext(AppContext);
  const { value } = props;

  const buttonClickHandler = (e) => {
    const action = e.target.value;
    updateLoadout(value, action);
  };



  return (
    <div className={styles.container}>
      <button onClick={buttonClickHandler} value="add">
        +
      </button>
      <button onClick={buttonClickHandler} value="subtract">
        -
      </button>
    </div>
  );
}
