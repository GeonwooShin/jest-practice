import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("스쿱과 토핑 컴포넌트 에러 처리", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  // 컴퓨터 속도에 따라 오류가 발생할 수 있다.
  // 경합 조건에 따라 단언문 실행전 두 네트워크 호출이 모두 반환되면 에러가 발생하지 않는다.
  // 하지만 하나의 네트워크 호출만 반환되었을 때 단언문이 실행되면 에러가 발생할 수 있다.
  // const alerts = await screen.findAllByRole("alert");
  // expect(alerts).toHaveLength(2);
  // 따라서 경합 조건에 영향을 받지않게 하기위해서는 다음과 같이 테스트를 구성해야한다.
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("주문한 스쿱이 없으면 주문 버튼 비활성화", async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  // 초기 주문 버튼 비활성화
  const orderButton = screen.getByRole("button", { name: "주문" });
  expect(orderButton).toBeDisabled();
  // 스쿱 추가한 경우 주문 버튼 활성화
  const strawberryInput = await screen.findByRole("spinbutton", {
    name: "Strawberry",
  });
  await user.clear(strawberryInput);
  await user.type(strawberryInput, "1");
  expect(orderButton).toBeEnabled();
  // 추가한 스쿱 다시 제거한 경우 주문 버튼 비활성화
  await user.clear(strawberryInput);
  await user.type(strawberryInput, "0");
  expect(orderButton).toBeDisabled();
});
