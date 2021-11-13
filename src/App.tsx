import Countdown from "./components/Countdown"
import Page from "./components/ui/Page"

const exampleEndDate = {
  year: 2021,
  month: 11,
  day: 20,
  hour: 21,
  minute: 28,
  second: 0,
}

function App() {
  return (
    <Page>
      <Countdown
        title="Starts in"
        format={["days", "hours", "minutes", "seconds"]}
        endDate={exampleEndDate}
      />
    </Page>
  )
}

export default App
