import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />); // 인수로 제공하는 JSX에 관한 가상 DOM을 생성
  const linkElement = screen.getByText(/learn react/i); // 생성된 가상돔에는 screen global 객체로 접근
  expect(linkElement).toBeInTheDocument(); // 단언, 단언은 테스트 성공과 실패의 원인
  // toBeInTheDocument는 matcher이고, matcher는 단언의 유형이다
  // matcher에 일치시켜야 테스트가 통과한다.
});
