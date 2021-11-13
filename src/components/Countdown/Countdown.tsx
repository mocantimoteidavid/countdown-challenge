import Unit from "./Unit"
import Title from "./Title"
import UnitsWrapper from "./UnitsWrapper"

interface Props {
  title: string
  endTime?: string
  format?: ["sdf" | "sdf1"]
}

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
 *
 *
 *
 *
 *
 */

const Countdown: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Title>{title}</Title>
      <UnitsWrapper>
        <Unit label="Days" value={3} />
        <Unit label="Hours" value={9} />
        <Unit label="Minutes" value={28} />
        <Unit label="Seconds" value={283} />
      </UnitsWrapper>
    </>
  )
}

export default Countdown
