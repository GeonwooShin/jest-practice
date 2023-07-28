import { render, screen } from "@testing-library/react";
import App from "./App";

test("버튼이 정확한 초기 색상을 가진다.", () => {
  render(<App />);
  // button이라는 role을 가지고 텍스트가 Change to Blue인 요소를 가상 DOM에서 찾는다.
  const colorButton = screen.getByRole("button", { name: "Change to Blue" });
  // button의 배경 색상이 레드임을 단언한다.
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("클릭하면 버튼이 파란색으로 변경된다.", () => {});
