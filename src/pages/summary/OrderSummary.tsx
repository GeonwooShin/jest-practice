import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../../src/contexts/OrderDetails";
import { Dispatch, SetStateAction } from "react";

const OrderSummary = ({
  setOrderPhase,
}: {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}) => {
  const { totals, optionCounts } = useOrderDetails();
  const scoopArr = Object.entries(optionCounts.scoops);
  const scoopList = scoopArr.map(([key, value]: any) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  const toppingArr = Object.keys(optionCounts.toppings);
  const toppingList = toppingArr.map((key) => <li key={key}>{key}</li>);
  return (
    <div>
      <h1>주문 요약</h1>
      <h2>Scoops: {totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
