import { useContext, useEffect } from "react";
import AppContext from "../../../store/AppContext";

import styles from "./Breakdown.module.scss";
import BreakdownEntry from "./BreakdownEntry/BreakdownEntry";

export default function Breakdown() {
  const {
    loadout,
    totalPlateWeight,
    setTotalPlateWeight,
    calculatePlateTotal,
  } = useContext(AppContext);

  useEffect(() => {
    calculatePlateTotal();
  }, [loadout, setTotalPlateWeight, calculatePlateTotal]);

  const tableData = loadout.map((entry) => {
    const { value, amountPerSide } = entry;
    const total = value * (amountPerSide * 2);

    return (
      <BreakdownEntry
        key={value}
        value={value}
        amountPerSide={amountPerSide}
        totalPlates={amountPerSide * 2}
        total={total}
      />
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
            <th>Amount Total</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style={{fontWeight: "bold"}}>TOTAL:</td>
            <td style={{fontWeight: "bold"}}>{totalPlateWeight}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
