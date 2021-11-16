import dayjs, { UnitTypeLongPlural } from "dayjs"

export type PossibleUnit = Exclude<UnitTypeLongPlural, "dates" | "milliseconds">

function getEndDateDifferenceByUnit(
  parsedEndDate: dayjs.Dayjs,
  format: PossibleUnit[]
): number[] {
  const currentDate = dayjs()
  let modifiableEndDate = dayjs(parsedEndDate)
  let differencesByUnit: number[] = []

  format.forEach((unit) => {
    const unitDifference = modifiableEndDate.diff(currentDate, unit)
    differencesByUnit.push(unitDifference)

    const singularUnit: string = unit.slice(0, -1)
    modifiableEndDate = modifiableEndDate.subtract(unitDifference, singularUnit)
  })

  return differencesByUnit
}

const mapUnitToLabel: Record<PossibleUnit, string> = {
  years: "Years",
  months: "Months",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
}

const unitWeights: Record<PossibleUnit, number> = {
  years: 1,
  months: 2,
  days: 3,
  hours: 4,
  minutes: 5,
  seconds: 6,
}

const getSortedFormat = (format: PossibleUnit[]): PossibleUnit[] =>
  format.sort((a, b) => unitWeights[a] - unitWeights[b])

export { getEndDateDifferenceByUnit, getSortedFormat, mapUnitToLabel }
