import { render } from "@testing-library/react"
import Title from "./Title"

describe("Title", () => {
  it("renders with correct styling", () => {
    const { container } = render(<Title>Alladin</Title>)

    expect(container.firstChild).toMatchSnapshot()
  })
})
