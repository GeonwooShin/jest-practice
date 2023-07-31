import { render, screen, fireEvent } from "@testing-library/react";
import { replaceCamelWithSpaces } from "./App";
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

test("초기설정", () => {
  render(<App />);
  // 버튼이 활성화 상태로 시작
  const colorButton = screen.getByRole("button", { name: "Change to Blue" });
  expect(colorButton).toBeEnabled();
  // 체크박스는 체크가 안된상태로 시작
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("체크박스 체크 시 버튼 비활성화, 체크박스 비체크 시 버튼 활성화", () => {
  render(<App />);
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "버튼 비활성화" });
  // 체크박스가 체크되면 버튼이 disabled로 변경
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  // 체크박스가 다시 비체크되면 버튼이 활성화
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("빨간 버튼일 때 버튼 비활성화 시 버튼 색상 회색, 활성화 시 빨강", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "버튼 비활성화" });
  // 버튼이 disabled일 때 버튼 색상 회색
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("backgroundColor: gray");
  // 버튼이 다시 활성화되면 버튼 색상 빨강
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("backgroundColor: red");
});

test("파란 버튼일 때 버튼 비활성화 시 버튼 색상 회색, 활성화 시 파랑", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "버튼 비활성화" });
  // 버튼 클릭 시 파랑색으로 색상 변경
  fireEvent.click(button);
  // 버튼이 disabled일 때 버튼 색상 회색
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("backgroundColor: gray");
  // 버튼이 다시 활성화되면 버튼 색상 파랑
  fireEvent.click(checkbox);
  expect(button).toHaveStyle("backgroundColor: blue");
});

// 함수 유닛테스트
describe("카멜케이스 앞에 공백 삽입", () => {
  test("카멜케이스 단어에 추가적인 대문자가 존재하지 않을 때 실행", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("카멜케이스 단어에 추가적인 하나의 대문자가 존재할 때 실행", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("카멜케이스 단어에 추가적인 대문자가 여러개 존재할 때 실행", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
