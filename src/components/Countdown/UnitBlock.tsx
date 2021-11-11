interface Props {
  label: String
}

const UnitBlock: React.FC<Props> = ({ label }) => {
  return <>unit: {label};</>
}

export default UnitBlock
