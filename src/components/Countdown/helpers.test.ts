import dayjs from "dayjs"
import {
  getCurrentTime,
  getFormattedTimeDifferences,
  getSortedFormat,
  inferInitialStateFromProps,
  PossibleUnit,
  shouldRenderLeadingZero,
} from "./helpers"

describe("getSortedFormat", () => {
  it("returns a sorted array of units based on the predefined unit weight", () => {
    const input: PossibleUnit[] = ["seconds", "days", "minutes"]

    const output = getSortedFormat(input)

    expect(output).toEqual(["days", "minutes", "seconds"])
  })
})

describe("getFormattedTimeDifferences", () => {
  let currentTime = getCurrentTime()

  beforeEach(() => {
    currentTime = getCurrentTime()
  })

  it("returns the time differences between two dates in the desired format", () => {
    const endDate = dayjs().add(1, "day").add(2, "hour")
    const format: PossibleUnit[] = ["days", "hours"]

    const output = getFormattedTimeDifferences(currentTime, endDate, format)

    expect(output).toEqual([1, 2])
  })

  it("returns the time differences for all possible units", () => {
    const endDate = dayjs()
      .add(1, "year")
      .add(2, "month")
      .add(3, "day")
      .add(4, "hour")
      .add(5, "minute")
      .add(6, "second")
    const format: PossibleUnit[] = [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ]

    const output = getFormattedTimeDifferences(currentTime, endDate, format)

    expect(output).toEqual([1, 2, 2, 4, 5, 6])
  })
})

describe("shouldRenderLeadingZero", () => {
  it("returns true for 'hours'", () => {
    const output = shouldRenderLeadingZero("hours")

    expect(output).toBe(true)
  })

  it("returns true for 'minutes'", () => {
    const output = shouldRenderLeadingZero("minutes")

    expect(output).toBe(true)
  })

  it("returns true for 'seconds'", () => {
    const output = shouldRenderLeadingZero("seconds")

    expect(output).toBe(true)
  })

  it("returns false for 'years'", () => {
    const output = shouldRenderLeadingZero("years")

    expect(output).toBe(false)
  })

  it("returns false for 'months'", () => {
    const output = shouldRenderLeadingZero("months")

    expect(output).toBe(false)
  })

  it("returns false for 'days'", () => {
    const output = shouldRenderLeadingZero("days")

    expect(output).toBe(false)
  })
})

describe("getCurrentTime", () => {
  it("returns correct current time", () => {
    const fixedTime = 1608492020000
    const mockedDate = new Date(fixedTime)
    const spy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => (mockedDate as unknown) as string)

    expect(getCurrentTime()).toEqual(1608492020000)

    spy.mockRestore()
  })
})

describe("inferInitialStateFromProps", () => {
  it("returns correct state object from props", () => {
    const endDate = {
      year: 2029,
      month: 12,
      day: 24,
      hour: 23,
      minute: 59,
      second: 59,
    }
    const format: PossibleUnit[] = [
      "months",
      "years",
      "days",
      "seconds",
      "minutes",
    ]

    const output = inferInitialStateFromProps(1608492020000, format, endDate)

    expect(output).toEqual({
      countdownValues: [9, 0, 4, 219, 39],
      hasEnded: false,
      parsedEndDate: expect.anything(),
      sortedFormat: ["years", "months", "days", "minutes", "seconds"],
    })
  })

  it("returns hasEnded 'true' if endDate is in the past", () => {
    const endDate = {
      year: 1999,
      month: 1,
      day: 1,
      hour: 1,
      minute: 1,
      second: 1,
    }
    const format: PossibleUnit[] = ["years"]

    const output = inferInitialStateFromProps(1608492020000, format, endDate)

    expect(output.hasEnded).toEqual(true)
  })
})
