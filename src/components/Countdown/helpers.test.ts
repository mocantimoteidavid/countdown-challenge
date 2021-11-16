import { getSortedFormat, PossibleUnit } from "./helpers"

describe("getSortedFormat", () => {
  it("returns a sorted array of units based on the units weight", () => {
    const input: PossibleUnit[] = ["seconds", "days", "minutes"]

    expect(getSortedFormat(input)).toEqual(["days", "minutes", "seconds"])
  })
})
