import { render } from "@testing-library/react"
import UnitsWrapper from "./UnitsWrapper"

describe("UnitsWrapper", () => {
  it("renders with correct styling", () => {
    const { container } = render(<UnitsWrapper />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
