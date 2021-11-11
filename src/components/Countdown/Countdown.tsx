import UnitBlock from "./UnitBlock"

interface Props {
  title: String
  endDate?: String
  format?: ["sdf" | "sdf1"]
}

const Countdown: React.FC<Props> = ({ title }) => {
  return (
    <>
      countdown {title} counting down...
      <br />
      <UnitBlock label="Jackson" />
      <UnitBlock label="Frei" />
    </>
  )
}

export default Countdown
