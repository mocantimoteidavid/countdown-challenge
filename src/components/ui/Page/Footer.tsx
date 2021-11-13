import styled from "styled-components"

const StyledFooter = styled.footer`
  border-top: 1px solid lightgrey;
  color: grey;
  padding: 32px 16px;
  margin-top: 32px;
`

const Footer = () => (
  <StyledFooter>
    <p>Developed by Timotei Mocan</p>
  </StyledFooter>
)

export default Footer
