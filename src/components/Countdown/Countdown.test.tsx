import { render, screen } from "@testing-library/react"
import Countdown from "./Countdown"

describe("Countdown", () => {
  const exampleEndDate = {
    year: 2021,
    month: 12,
    day: 25,
    hour: 9,
    minute: 0,
    second: 0,
  }

  const pastEndDate = {
    ...exampleEndDate,
    year: 1999,
  }

  beforeEach(() => {
    jest.useFakeTimers("modern")
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders correct with title", () => {
    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    )

    const renderedTitle = screen.getByTestId("title").innerHTML

    expect(renderedTitle).toEqual("Banananas")
  })

  it("renders correct units based on given format", () => {
    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    )

    const renderedUnitsLabels = screen.getAllByTestId("label")

    expect(renderedUnitsLabels[0].innerHTML).toEqual("Days")
    expect(renderedUnitsLabels[1].innerHTML).toEqual("Hours")
    expect(renderedUnitsLabels[2].innerHTML).toEqual("Minutes")
    expect(renderedUnitsLabels[3].innerHTML).toEqual("Seconds")
  })

  it("renders units in correct order no matter the given format", () => {
    render(
      <Countdown
        title="Banananas"
        format={["seconds", "days", "minutes", "hours", "years"]}
        endDate={exampleEndDate}
      />
    )

    const renderedUnitsLabels = screen.getAllByTestId("label")

    expect(renderedUnitsLabels[0].innerHTML).toEqual("Years")
    expect(renderedUnitsLabels[1].innerHTML).toEqual("Days")
    expect(renderedUnitsLabels[2].innerHTML).toEqual("Hours")
    expect(renderedUnitsLabels[3].innerHTML).toEqual("Minutes")
    expect(renderedUnitsLabels[4].innerHTML).toEqual("Seconds")
  })

  it("renders countdown ended message if endDate is in the past", () => {
    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={pastEndDate}
      />
    )

    expect(screen.queryByTestId("endedMessage")).toBeInTheDocument()
  })

  it("renders correct values for a valid countdown", () => {
    jest.setSystemTime(1638037132479)

    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    )

    const renderedUnitsValues = screen.getAllByTestId("value")

    expect(renderedUnitsValues[0].innerHTML).toEqual("27")
    expect(renderedUnitsValues[1].innerHTML).toEqual("13")
    expect(renderedUnitsValues[2].innerHTML).toEqual("41")
    expect(renderedUnitsValues[3].innerHTML).toEqual("07")
  })

  it("advances correctly second by second", () => {
    jest.setSystemTime(1638037132479)

    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    )

    const renderedUnitsValues = screen.getAllByTestId("value")

    expect(renderedUnitsValues[3].innerHTML).toEqual("07")

    jest.advanceTimersByTime(1000)

    expect(renderedUnitsValues[3].innerHTML).toEqual("06")

    jest.advanceTimersByTime(1000)

    expect(renderedUnitsValues[3].innerHTML).toEqual("05")
  })

  it("correctly counts down multiple units", () => {
    jest.setSystemTime(1638037132479)

    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    )

    const renderedUnitsValues = screen.getAllByTestId("value")

    expect(renderedUnitsValues[2].innerHTML).toEqual("41")
    expect(renderedUnitsValues[3].innerHTML).toEqual("07")

    jest.advanceTimersByTime(1000)

    expect(renderedUnitsValues[2].innerHTML).toEqual("41")
    expect(renderedUnitsValues[3].innerHTML).toEqual("06")

    jest.advanceTimersByTime(7000)

    expect(renderedUnitsValues[2].innerHTML).toEqual("40")
    expect(renderedUnitsValues[3].innerHTML).toEqual("59")
  })

  it("correctly renders endedMessage when countdown finishes", () => {
    jest.setSystemTime(1638038155636)

    render(
      <Countdown
        title="Banananas"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={{
          year: 2021,
          month: 11,
          day: 27,
          hour: 19,
          minute: 35,
          second: 57,
        }}
      />
    )

    expect(screen.queryByTestId("endedMessage")).not.toBeInTheDocument()

    const renderedUnitsValues = screen.getAllByTestId("value")

    expect(renderedUnitsValues[0].innerHTML).toEqual("0")
    expect(renderedUnitsValues[1].innerHTML).toEqual("00")
    expect(renderedUnitsValues[2].innerHTML).toEqual("00")
    expect(renderedUnitsValues[3].innerHTML).toEqual("01")

    jest.advanceTimersByTime(1000)

    expect(renderedUnitsValues[3].innerHTML).toEqual("00")

    jest.advanceTimersByTime(1000)

    expect(screen.queryAllByTestId("value").length).toEqual(0)
    expect(screen.queryByTestId("endedMessage")).toBeInTheDocument()
  })
})
