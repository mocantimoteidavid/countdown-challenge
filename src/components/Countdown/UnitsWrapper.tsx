import styled from "styled-components"

const UnitsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: left;

  & > div:not(:last-child) {
    margin-right: 6px;
  }
`

export default UnitsWrapper
