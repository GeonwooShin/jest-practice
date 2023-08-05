import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

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
