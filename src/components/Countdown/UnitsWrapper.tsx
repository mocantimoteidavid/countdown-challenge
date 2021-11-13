import styled from "styled-components"

const UnitsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: left;

  & > div {
    margin-right: 6px;
  }
  & > div:last-child {
    margin-right: 0;
  }
`

export default UnitsWrapper
