import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../../src/constants/index";
import { useOrderDetails } from "../../../src/contexts/OrderDetails";

type optionItemsType = {
  name: string;
  imagePath: string;
};

const Options = ({ optionType }: { optionType: string }) => {
  const [items, setItems] = useState<optionItemsType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { totals } = useOrderDetails();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((res) => setItems(res.data))
      .catch(() => setError(true));
    // 컴포넌트 언마운트시 axios 호출 중단
    return () => {
      controller.abort();
    };
  }, [optionType]);
  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item: optionItemsType) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>개당 {pricePerItem[optionType]}</p>
      <p>
        {title} 총: {totals[optionType]}원
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
