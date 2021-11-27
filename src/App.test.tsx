import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders application without crashing", () => {
  render(<App />)
  const countdownTitle = screen.getByTestId("title")
  expect(countdownTitle).toBeInTheDocument()
})
