import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logRoles } from "@testing-library/react";
import App from "../App";

test("행복 경로를 위한 주문 단계", async () => {
  const user = userEvent.setup();
  // 애플리케이션 렌더
  const { unmount, container } = render(<App />);
  // 아이스크림 스쿱과 토핑 추가
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cookiesCheckbox = await screen.findByRole("checkbox", {
    name: "Cookies",
  });
  await user.click(cookiesCheckbox);
  // 주문 입력 페이지에서 주문 버튼 클릭
  const orderButton = screen.getByRole("button", { name: "주문" });
  await user.click(orderButton);
  // 주문 내용을 기반으로 요약 정보 확인
  const scoopList = screen.getByText("스쿱 소계", { exact: false });
  expect(scoopList).toHaveTextContent("4000");
  const toppingList = screen.getByText("토핑 소계", { exact: false });
  expect(toppingList).toHaveTextContent("1500");
  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cookies")).toBeInTheDocument();
  // 이용약관 수락 후 주문 확인
  const orderCheckbox = screen.getByRole("checkbox", {
    name: "약관 확인에 동의합니다.",
  });
  await user.click(orderCheckbox);

  const orderConfirmButton = screen.getByRole("button", { name: "주문 확인" });
  await user.click(orderConfirmButton);

  const loading = screen.queryByText("로딩...");
  expect(loading).toBeInTheDocument();
  // 확인 페이지에서 주문번호 확인
  const thankHeader = await screen.findByRole("heading", {
    name: "감사합니다!",
  });
  expect(thankHeader).toBeInTheDocument();
  const notLoading = screen.queryByText("로딩...");
  expect(notLoading).not.toBeInTheDocument();
  const orderNumber = await screen.findByText(/주문 번호/);
  expect(orderNumber).toBeInTheDocument();
  // 새 주문 버튼 클릭
  const newOrderButton = screen.getByRole("button", { name: "새 주문" });
  await user.click(newOrderButton);
  // 아이스크림 스쿱과 토핑 소계 재설정 확인
  const scoopTotal = await screen.findByText("Scoops 총:", { exact: false });
  expect(scoopTotal).toHaveTextContent("0");
  const toppingTotal = await screen.findByText("Toppings 총:", {
    exact: false,
  });
  expect(toppingTotal).toHaveTextContent("0");

  unmount();
});

test("토핑이 없는 경우 주문 요약에 토핑 헤더 제외", async () => {
  const user = userEvent.setup();
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  const orderSummaryButton = screen.getByRole("button", { name: "주문" });
  await user.click(orderSummaryButton);
  const scoopsHeading = screen.getByText("스쿱 소계", { exact: false });
  expect(scoopsHeading).toHaveTextContent("6000");

  const toppingsHeading = screen.queryByText("토핑 소계", { exact: false });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("토핑 추가 후 제거한 경우 주문 요약에 토핑 헤더 제외", async () => {
  const user = userEvent.setup();
  render(<App />);
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  const total = screen.getByText("총 합계:", { exact: false });
  expect(total).toHaveTextContent("3500");

  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(total).toHaveTextContent("2000");

  const orderSummaryButton = screen.getByRole("button", { name: "주문" });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByText("스쿱 소계", { exact: false });
  expect(scoopsHeading).toHaveTextContent("2000");

  const toppingsHeading = screen.queryByText("토핑 소계", { exact: false });
  expect(toppingsHeading).not.toBeInTheDocument();
});
