import styled from "styled-components"
import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"

const StyledPage = styled.div`
  min-height: 100vh;
  max-width: 750px;
  margin: 0 auto;
  font-size: 16px;
`

const Page: React.FC = ({ children }) => {
  return (
    <StyledPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </StyledPage>
  )
}

export default Page
