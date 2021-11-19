import AddSubtractButtons from "../AddSubtractButtons/AddSubtractButtons";

export default function BreakdownEntry(props) {
  const { value, amount, total } = props;
  return (
    <tr key={value}>
      <td>{value}</td>
      <td>
        <AddSubtractButtons value={value} />
      </td>
      <td>{amount}</td>
      <td>{total}</td>
    </tr>
  );
}
