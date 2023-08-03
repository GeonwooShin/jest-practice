import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";

type optionItemsType = {
  name: string;
  imagePath: string;
};

const Options = ({ optionType }: { optionType: string }) => {
  const [items, setItems] = useState<optionItemsType[]>([]);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch(() => setError(true));
  }, [optionType]);
  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map((item: optionItemsType) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
};

export default Options;
