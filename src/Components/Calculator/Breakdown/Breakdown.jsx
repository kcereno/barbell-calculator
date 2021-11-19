import { useContext, useEffect } from "react";
import AppContext from "../../../store/AppContext";

import styles from "./Breakdown.module.scss";
import BreakdownEntry from "./BreakdownEntry/BreakdownEntry";

export default function Breakdown() {
  const { loadout, totalPlateWeight, setTotalPlateWeight } =
    useContext(AppContext);

  const calculatePlateTotal = () => {
    let result = 0;

    loadout.forEach((entry) => {
      const { value, amount } = entry;
      let total = value * amount;
      result = result + total;
    });

    setTotalPlateWeight(result);
  };

  useEffect(calculatePlateTotal, [loadout, setTotalPlateWeight]);

  const tableData = loadout.map((entry) => {
    const { value, amount } = entry;
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
            <th>Amount Per Side</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>TOTAL:</td>
            <td>{totalPlateWeight}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
