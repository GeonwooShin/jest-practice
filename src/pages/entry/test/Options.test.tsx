import userEvent from "@testing-library/user-event";
import {
  logRoles,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("서버에서 전달받은 scoop 옵션에 관한 이미지 출력", async () => {
  render(<Options optionType="scoops" />);
  // 이미지 찾기
  const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(4);
  // 이미지의 alt text를 확인한다.
  const altText = scoopImages.map((ele) => ele.alt);
  // 문자열이나 숫자는 toBe 매쳐를 사용하지만, 배열이나 객체는 toEqual 매쳐를 사용한다.
  expect(altText).toEqual([
    "Chocolate scoop",
    "Vanilla scoop",
    "Mint Chocolate scoop",
    "Strawberry scoop",
  ]);
});

test("서버에서 전달받은 topping 옵션에 관한 이미지 출력", async () => {
  render(<Options optionType="toppings" />);
  const toppingImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(5);
  const altText = toppingImages.map((ele) => ele.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "MandMs topping",
    "Cookies topping",
    "Jellies topping",
    "Splinkles topping",
  ]);
});

test("유효하지 않은 스쿱 값에 대해 소계 업데이트 차단", async () => {
  const user = userEvent.setup();
  const { container } = render(<Options optionType="scoops" />);
  // 유효하지 않은 값 입력
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const scoopsTotal = screen.getByText("Scoops 총", { exact: false });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "14");
  expect(scoopsTotal).toHaveTextContent("Scoops 총: 0원");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-3");
  expect(scoopsTotal).toHaveTextContent("Scoops 총: 0원");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(scoopsTotal).toHaveTextContent("Scoops 총: 0원");
});
