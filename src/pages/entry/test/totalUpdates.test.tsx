import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("스쿱 옵션이 변경되면 스쿱에 해당하는 소계 업데이트", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // 소계가 0원으로 시작
  const scoopsSubtotal = screen.getByText("총:", { exact: false }); // exact 옵션을 사용하는 경우 text값이 일부만 일치해도 요소를 찾는 것이 가능
  expect(scoopsSubtotal).toHaveTextContent("0");
  // 바닐라 스쿱을 1개로 업데이트 후 소계 확인
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2000");
  // 초콜릿 스쿱을 2개로 업데이트 후 소계 확인
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6000");
});

test("토핑 옵션이 변경되면 토핑에 해당하는 소계 업데이트", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  // 토핑 소계가 0원으로 시작
  const toppingsSubtotal = screen.getByText("총:", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0");
  // 체리 토핑 체크박스가 체크가 안되어있는지 확인
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).not.toBeChecked();
  // 체리 토핑을 체크 후 소계 확인
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1500");
  // 스프링크 토핑 체크박스가 체크가 안되어있는지 확인
  const sprinklesCheckbox = screen.getByRole("checkbox", {
    name: "Splinkles",
  });
  expect(sprinklesCheckbox).not.toBeChecked();
  // 스프링클 토핑을 체크 후 소계 확인
  await user.click(sprinklesCheckbox);
  expect(sprinklesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3000");
  // 체리 토핑 체크박스를 해제 후 소계확인
  expect(cherriesCheckbox).toBeChecked();
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1500");
});

describe("총 합계 확인", () => {
  test("총 합계가 0원으로 시작", () => {
    const { unmount } = render(<OrderEntry setOrderPhase={jest.fn()} />);
    const total = screen.getByRole("heading", { name: /총 합계: / });
    expect(total).toHaveTextContent("0");
    unmount();
  });
  test("스쿱 먼저 추가 시 총 합계가 정상적으로 업데이트", async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const total = screen.getByRole("heading", { name: /총 합계: / });
    // 바닐라 스쿱 두개 추가
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(total).toHaveTextContent("4000");
    // 체리 토핑 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(total).toHaveTextContent("5500");
  });
  test("토핑 먼저 추가 시 총 합계가 정상적으로 업데이트", async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const total = screen.getByRole("heading", { name: /총 합계: / });
    // 체리 토핑 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(total).toHaveTextContent("1500");
    // 딸기 스쿱 세개 추가
    const strawberryInput = await screen.findByRole("spinbutton", {
      name: "Strawberry",
    });
    await user.clear(strawberryInput);
    await user.type(strawberryInput, "3");
    expect(total).toHaveTextContent("7500");
  });
  test("토핑 또는 스쿱 제거 시 총 합계가 정상적으로 업데이트", async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const total = screen.getByRole("heading", { name: /총 합계: / });
    // 체리 토핑 추가
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // 바닐라 스쿱 3개 추가
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "3");
    // 바닐라 스쿱 2개 제거
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(total).toHaveTextContent("3500");
    // 체리 토핑 제거
    await user.click(cherriesCheckbox);
    expect(total).toHaveTextContent("2000");
  });
});
