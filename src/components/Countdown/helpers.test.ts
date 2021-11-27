import dayjs from "dayjs"
import {
  getCurrentTime,
  getFormattedTimeDifferences,
  getSortedFormat,
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

    expect(output).toEqual([1, 2, 3, 4, 5, 6])
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
    const fixedTime = 1466424490000
    const mockedDate = new Date(fixedTime)
    const spy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => (mockedDate as unknown) as string)

    expect(getCurrentTime()).toEqual(1466424490000)

    spy.mockRestore()
  })
})
