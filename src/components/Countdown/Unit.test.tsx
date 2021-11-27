import { render, screen } from "@testing-library/react"
import Unit from "./Unit"

describe("Unit", () => {
  it("renders label and value correctly", () => {
    render(<Unit label="Pants" value={26} />)

    const renderedValue = screen.getByTestId("value").innerHTML
    const renderedLabel = screen.getByTestId("label").innerHTML

    expect(renderedValue).toEqual("26")
    expect(renderedLabel).toEqual("Pants")
  })

  it("renders leading 0 for one digit value when leadingZero is true", () => {
    render(<Unit label="Pants" value={7} leadingZero />)

    const renderedValue = screen.getByTestId("value").innerHTML

    expect(renderedValue).toEqual("07")
  })

  it("does not render leading 0 for two digits value when leadingZero is true", () => {
    render(<Unit label="Pants" value={20} leadingZero />)

    const renderedValue = screen.getByTestId("value").innerHTML

    expect(renderedValue).toEqual("20")
  })

  it("does not render leading 0 for one digit value when leadingZero is false", () => {
    render(<Unit label="Pants" value={7} />)

    const renderedValue = screen.getByTestId("value").innerHTML

    expect(renderedValue).toEqual("7")
  })

  it("renders with correct styling", () => {
    const { container } = render(<Unit label="Pants" value={7} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
