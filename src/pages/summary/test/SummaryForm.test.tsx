import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("체크박스 디폴트 값은 체크되지 않은 체크박스이다.", () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const checkbox = screen.getByRole("checkbox", {
    name: "약관 확인에 동의합니다.",
  });
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole("button", { name: "주문 확인" });
  expect(button).toBeDisabled();
});

test("체크박스가 체크되면 버튼이 활성화되고 체크되지 않으면 비활성화 된다.", async () => {
  const user = userEvent.setup();
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const button = screen.getByRole("button", { name: "주문 확인" });
  const checkbox = screen.getByRole("checkbox", {
    name: "약관 확인에 동의합니다.",
  });
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("마우스 커서를 올리면 팝오버 된다.", async () => {
  const user = userEvent.setup();
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  // 팝오버가 처음에는 숨겨져있다.
  const nullPopover = screen.queryByText(
    "아이스크림이 실제로 배달되지는 않습니다."
  );
  expect(nullPopover).not.toBeInTheDocument();
  // 체크박스에 마우스를 올리면 팝오버가 나타난다.
  const checkbox = screen.getByText("약관 확인에 동의합니다.");
  await user.hover(checkbox);
  const popover = screen.getByText("아이스크림이 실제로 배달되지는 않습니다.");
  expect(popover).toBeInTheDocument();
  // 마우스를 치우면 팝오버가 사라진다.
  await user.unhover(checkbox);
  expect(popover).not.toBeInTheDocument();
});
