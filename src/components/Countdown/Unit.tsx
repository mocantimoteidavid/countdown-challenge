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
  return (
    <Wrapper>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Wrapper>
  )
}

export default Unit
