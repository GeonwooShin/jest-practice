import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useOrderDetails } from "../../../src/contexts/OrderDetails";
import axios from "axios";
import { Button } from "react-bootstrap";

const OrderConfirmation = ({
  setOrderPhase,
}: {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}) => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const { resetOrder } = useOrderDetails();
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {});
  }, []);
  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };
  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>감사합니다!</h1>
        <p>주문 번호: {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>실제로 주문이 이루어지지는 않습니다.</p>
        <Button onClick={handleClick}>새 주문</Button>
      </div>
    );
  } else {
    return <div>로딩...</div>;
  }
};

export default OrderConfirmation;
