import { render, screen } from "../../../test-utils/testing-library-utils";
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
