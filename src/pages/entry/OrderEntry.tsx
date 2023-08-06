import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>총 합계: {totals.scoops + totals.toppings}</h2>
    </div>
  );
};

export default OrderEntry;
