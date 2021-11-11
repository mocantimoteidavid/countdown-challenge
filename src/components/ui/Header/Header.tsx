import styled from "styled-components"

const StyledHeader = styled.header`
  padding: 48px 16px;

  & h1 {
    font-size: 64px;
    margin: 0;
  }
`

const Header = () => (
  <StyledHeader>
    <h1>Countdown</h1>
  </StyledHeader>
)

export default Header
