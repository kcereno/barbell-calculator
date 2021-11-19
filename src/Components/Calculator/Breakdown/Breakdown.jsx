import { useContext } from "react";
import AppContext from "../../../store/AppContext";

import styles from "./Breakdown.module.scss";
import BreakdownEntry from "./BreakdownEntry/BreakdownEntry";

export default function Breakdown() {
  const { loadout } = useContext(AppContext);

  const tableData = loadout.map((plate) => {
    const { value, amount } = plate;
    const total = value * amount;

    return (
      <BreakdownEntry key={value} value={value} amount={amount} total={total} />
    );
  });

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Add/Subtract</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}
