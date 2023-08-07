import { SetStateAction, Dispatch } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "./Options";
import { Button } from "react-bootstrap";

const OrderEntry = ({
  setOrderPhase,
}: {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}) => {
  const { totals } = useOrderDetails();
  const handleClick = () => {
    setOrderPhase("review");
  };
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>총 합계: {totals.scoops + totals.toppings}</h2>
      <Button onClick={handleClick}>주문</Button>
    </div>
  );
};

export default OrderEntry;
