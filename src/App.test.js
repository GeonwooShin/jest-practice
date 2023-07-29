import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("버튼이 적절한 초기색상을 가지고 버튼을 클릭하면 버튼이 파란색으로 변경된다.", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to Blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
  // button 클릭
  fireEvent.click(colorButton);
  // 클릭 후 button의 배경 색상이 블루임을 단언한다.
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  // button의 텍스트 또한 Change to Red임을 단언한다.
  expect(colorButton).toHaveTextContent("Change to Red");
});
