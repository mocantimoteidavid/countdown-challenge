import styled from "styled-components"

const StyledFooter = styled.footer`
  border-top: 1px solid lightgrey;
  color: grey;
  padding: 24px 16px;
  margin-top: 32px;
`

const Footer = () => (
  <StyledFooter>
    <p>Made with ❤️ by Timotei Mocan</p>
  </StyledFooter>
)

export default Footer
