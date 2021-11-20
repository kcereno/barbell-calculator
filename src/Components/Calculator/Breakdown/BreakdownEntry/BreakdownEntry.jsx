import AddSubtractButtons from "../AddSubtractButtons/AddSubtractButtons";

export default function BreakdownEntry(props) {
  const { value, amountPerSide, total, totalPlates } = props;

  const isDisabled = amountPerSide === 0;

  return (
    <tr key={value}>
      <td>{value}</td>
      <td>
        <AddSubtractButtons value={value} isDisabled={isDisabled} />
      </td>
      <td>{amountPerSide}</td>
      <td>{totalPlates}</td>
      <td>{total}</td>
    </tr>
  );
}
