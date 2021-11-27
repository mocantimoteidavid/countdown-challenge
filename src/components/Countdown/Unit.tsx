import styled from "styled-components"

interface Props {
  label: string
  value: number
  leadingZero?: boolean
}

const Label = styled.label`
  text-transform: uppercase;
  font-size: 10px;
  margin: 0;
  padding: 0;
`

const Value = styled.div`
  font-size: 38px;
  line-height: 45px;
  font-weight: 600;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`

const Wrapper = styled.div`
  border: 1px solid #040404;
  padding: 1px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 58px;
`

const Unit: React.FC<Props> = ({ label, value, leadingZero }) => {
  const isValueSingleDigit = value < 10 && value >= 0
  const displayValue = isValueSingleDigit && leadingZero ? `0${value}` : value

  return (
    <Wrapper>
      <Value data-testid="value">{displayValue}</Value>
      <Label data-testid="label">{label}</Label>
    </Wrapper>
  )
}

export default Unit
