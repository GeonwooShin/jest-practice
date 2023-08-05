import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants/index";

type orderDetailsType = {
  scoops: {
    Chocolate?: number;
    Vanilla?: number;
    MintChocolate?: number;
    Strawberry?: number;
  };
  toppings: {
    Cherries?: number;
    MandMs?: number;
    Cookies?: number;
    Jellies?: number;
    Splinkles?: number;
  };
  [key: string]: { [key: string]: number };
};

const OrderDetails = createContext<orderDetailsType>({
  scoops: {},
  toppings: {},
});

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      "useOrderDetails는 OrderDetailsProvider 내부에서 호출되어야 한다."
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState<orderDetailsType>({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: string
  ) {
    const newOptionCounts: orderDetailsType = { ...optionCounts };
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calcTotal(optionType: string): number {
    const countsArr: (number | undefined)[] = Object.values(
      optionCounts[optionType]
    );
    const totalCount = countsArr.reduce(
      (total, value) => ((total as number) + value!) as number,
      0
    );
    return (totalCount as number) * pricePerItem[optionType];
  }

  const totals = {
    scoops: calcTotal("scoops"),
    toppings: calcTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
