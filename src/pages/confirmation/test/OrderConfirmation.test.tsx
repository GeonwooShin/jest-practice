import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("주문 확인 페이지 에러 발생", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(
    "예상치 못한 에러가 발생했습니다. 다음에 다시 시도해주세요."
  );
});
