// import dayjs from "dayjs"
import {
  //   getEndDateDifferenceByUnit,
  getSortedFormat,
  PossibleUnit,
} from "./helpers"

describe("getSortedFormat", () => {
  it("returns a sorted array of units based on the units weight", () => {
    const input: PossibleUnit[] = ["seconds", "days", "minutes"]

    expect(getSortedFormat(input)).toEqual(["days", "minutes", "seconds"])
  })
})

// describe("getEndDateDifferenceByUnit", () => {
//   it("returns an array of diffs between two dayjs values", () => {
//     const endDate = dayjs("2024-10-10")
//     const format: PossibleUnit[] = ["years"]

//     const mockedCurrentDate = new Date(2022, 10, 10)
//     jest
//       .spyOn(global, "Date")
//       .mockImplementationOnce(() => (mockedCurrentDate as unknown) as string)

//     expect(getEndDateDifferenceByUnit(endDate, format)).toEqual([4])
//   })
// })
