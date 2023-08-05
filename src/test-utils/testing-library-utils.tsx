import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../../src/contexts/OrderDetails";

const renderWithContext = (ui: any, options?: any) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
