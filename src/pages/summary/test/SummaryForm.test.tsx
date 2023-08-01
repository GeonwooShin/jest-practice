import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("체크박스 디폴트 값은 체크되지 않은 체크박스이다.", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "약관 확인 에 동의합니다.",
  });
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole("button", { name: "주문 확인" });
  expect(button).toBeDisabled();
});

test("체크박스가 체크되면 버튼이 활성화되고 체크되지 않으면 비활성화 된다.", () => {
  render(<SummaryForm />);
  const button = screen.getByRole("button", { name: "주문 확인" });
  const checkbox = screen.getByRole("checkbox", {
    name: "약관 확인 에 동의합니다.",
  });
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
