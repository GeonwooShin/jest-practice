import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("정수가 아닌 값을 넣으면 spinbutton 색상 빨간색으로 교체", async () => {
  const user = userEvent.setup();
  render(<ScoopOption name={"Chocolate"} imagePath={"images/chocolate.png"} />);
  // 정수가 아닌 값 입력
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1.5");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-2");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "14");
  expect(chocolateInput).toHaveClass("is-invalid");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "3");
  expect(chocolateInput).not.toHaveClass("is-invalid");
});
