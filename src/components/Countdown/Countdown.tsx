import React from "react"
import dayjs from "dayjs"

import {
  getFormattedTimeDifferences,
  mapUnitToLabel,
  PossibleUnit,
  EndDate,
  getCurrentTime,
  shouldRenderLeadingZero,
  inferInitialStateFromProps,
} from "./helpers"
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
 * How do I render the leading 0?
 *   -- that will be rendered using a prop in the UnitBlock. Should be agnostic of anything outside.
 *   -- the prop will be passed for components that have the "hours", "minutes" & "seconds" format
 *
 *
 * Consider adding a Limitations section in the Readme with conclusions.
 *
 *
 *
 */

interface Props {
  title: string
  endDate: EndDate
  format: PossibleUnit[]
}

export interface State {
  hasEnded: boolean
  sortedFormat: PossibleUnit[]
  parsedEndDate: dayjs.Dayjs
  countdownValues: number[]
}

class ClassCountdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { format, endDate } = this.props

    const currentTime = getCurrentTime()

    this.state = inferInitialStateFromProps(currentTime, format, endDate)

    this.refreshCountdownValues = this.refreshCountdownValues.bind(this)
  }

  private countdownInterval: NodeJS.Timeout | null = null

  private removeCountdownInterval(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }

  private endCountdown(): void {
    this.removeCountdownInterval()
    this.setState({ hasEnded: true })
  }

  private refreshCountdownValues(
    parsedEndDate: dayjs.Dayjs,
    format: PossibleUnit[]
  ): void {
    const currentTime = getCurrentTime()
    const endTime = parsedEndDate.valueOf()

    if (currentTime >= endTime) {
      this.endCountdown()
    } else {
      const diffs = getFormattedTimeDifferences(
        getCurrentTime(),
        parsedEndDate,
        format
      )
      this.setState({ countdownValues: diffs })
    }
  }

  private startCountdown(): void {
    const { parsedEndDate, sortedFormat } = this.state

    this.countdownInterval = setInterval(() => {
      this.refreshCountdownValues(parsedEndDate, sortedFormat)
    }, 1000)
  }

  componentDidMount() {
    this.startCountdown()
  }

  componentWillUnmount() {
    this.removeCountdownInterval()
  }

  render() {
    const { title } = this.props
    const { countdownValues, sortedFormat, hasEnded } = this.state

    if (hasEnded) {
      return (
        <p data-testid="endedMessage">
          It's rather difficult to countdown to the past.
        </p>
      )
    }

    return (
      <>
        <Title data-testid="title">{title}</Title>
        <UnitsWrapper>
          {sortedFormat.map((unit, i) => {
            return (
              <Unit
                key={unit}
                label={mapUnitToLabel[unit]}
                value={countdownValues[i]}
                leadingZero={shouldRenderLeadingZero(unit)}
              />
            )
          })}
        </UnitsWrapper>
      </>
    )
  }
}

export default ClassCountdown
