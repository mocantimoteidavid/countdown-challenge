import React from "react"
import dayjs, { UnitTypeLongPlural } from "dayjs"

import Unit from "./Unit"
import Title from "./Title"
import UnitsWrapper from "./UnitsWrapper"

/**
 * Questions I would ask before starting to implement it.
 *
 * ### Design / Layout Questions
 *
 * Where would it be used?
 *   -- probably in some part of our website, since it is being built with React/Typescript.
 * What's the maximum number of digits we can have in one block?
 *   -- it's obvious to think marketing wouldn't build a countdown for more than 99 days. 2 it is then.
 *   -- even if it will be bigger, the block will just increase in size. Will look bad... I know.
 * Are the units supposed to be squares? Supposed to all be equal?
 *   -- from design image it seems to be tall blocks. I'll stick with that.
 * What happens if the label is longer than the block?
 *   -- will make it increase the block width.
 *   -- I would have considered truncating the labels with ellipsis, but I think the labels have to be visible at all times.
 *
 * ### Functionality Questions
 *
 * Who is going to use this Countdown component? Who is going to configure it?
 *   -- Important for e.g. "how do we specify the endTime of the countdown".
 *      -- What exact value are we going to provide?
 *      -- How are the props going to look like? One timestamp? Individual values for day, month, year, hour & minute?
 *      -- What about the extensibility aspect? How capable is the user of this countdown to figure out how to use it?
 *   -- I'll consider we, the devs are going to put it in place + feed it in with the correct props.
 * What exact value are we going to feed it in such that it calculates the countdown?
 *   -- A combination of the easiest to write & easiest to use would be ideal. Hence the EndDate type. Easy to read & easy to use.
 * How are we going to get the exact days/hours/minutes/seconds until the deadline? What about months too?
 *   -- easiest is we work with the milliseconds of the Date() object. But that could be unreliable when we calculate the months.
 *      For months and years I think we need to work with the years Date.getFullYear(). Could be wrong though.
 *   -- I think I'll use a built-in solution just to prevent trying to reinvent the wheel. Day.js seems like a good candidate. TS code, Good API documentation (https://day.js.org/docs/en/display/difference) and provides i18n support.
 * How to get individual units differences?
 *   -- I first thought that day.js would provide a basic solution for this, but it turns out I had to take each unit one by one in a descending order, calculate the difference for one, substract it from the endDate, calculate the next difference and continue so on.
 *   -- Otherwise for all units I was getting the difference of exactly how many days / minutes it took till the endDate. Which wasn't the desired outcome.
 * How do I optimise the JS calculations?
 *   -- I need to use 'useCallback' for individual methods inside the functional component, otherwise we have a new interval every second generated - meaning a ton of memory leaks - meaning laptop takes off in 1 minute
 *   -- Decided to refactor it into a class component - making it much easier to ready & understand. Too many callbacks made it difficult to read. Also the testing should be a bit more straightforward.
 *
 */

type EndDate = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

type PossibleUnit = Exclude<UnitTypeLongPlural, "dates" | "milliseconds">

interface Props {
  title: string
  endDate: EndDate
  /**
   * Must be ordered from biggest units to smallest.
   * Good example: ["days", "hours", "seconds"].
   * Bad example: ["days", "seconds", "hours"].
   */
  format: PossibleUnit[]
}

interface State {
  parsedEndDate: dayjs.Dayjs
  countdownValues: number[]
}

function getEndDateDifferenceByUnit(
  parsedEndDate: dayjs.Dayjs,
  format: PossibleUnit[]
): number[] {
  const currentDate = dayjs()
  let modifiableEndDate = dayjs(parsedEndDate)

  let differencesByUnit: number[] = []

  // transform to .reduce with accumulator
  format.forEach((unit) => {
    const unitDifference = modifiableEndDate.diff(currentDate, unit)
    differencesByUnit.push(unitDifference)

    const singularUnit = unit.slice(0, -1)
    modifiableEndDate = modifiableEndDate.subtract(unitDifference, singularUnit)
  })

  return differencesByUnit
}

class ClassCountdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const {
      format,
      endDate: { year, month, day, hour, minute, second },
    } = this.props

    const parsedEndDate = dayjs(
      new Date(year, month - 1, day, hour, minute, second)
    )

    this.state = {
      parsedEndDate,
      countdownValues: getEndDateDifferenceByUnit(parsedEndDate, format),
    }

    this.refreshCountdownValues = this.refreshCountdownValues.bind(this)
  }

  private countdownInterval: number | undefined

  private refreshCountdownValues(countdownInterval: number) {
    const { parsedEndDate } = this.state
    const { format } = this.props

    const currentTime = dayjs().valueOf()
    const endTime = parsedEndDate.valueOf()

    if (currentTime >= endTime) {
      clearInterval(countdownInterval)
    } else {
      const differences = getEndDateDifferenceByUnit(parsedEndDate, format)
      this.setState({ parsedEndDate, countdownValues: differences })
    }
  }

  componentDidMount() {
    this.countdownInterval = setInterval(this.refreshCountdownValues, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval)
  }

  render() {
    const { title, format } = this.props
    const { countdownValues } = this.state

    return (
      <>
        <Title>{title}</Title>
        <UnitsWrapper>
          {format.map((unit, i) => {
            return <Unit key={unit} label={unit} value={countdownValues[i]} />
          })}
        </UnitsWrapper>
      </>
    )
  }
}

export default ClassCountdown
