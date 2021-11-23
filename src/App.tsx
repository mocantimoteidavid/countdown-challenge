import Countdown from "./components/Countdown"
import Page from "./components/ui/Page"

const exampleEndDate = {
  year: 2021,
  month: 11,
  day: 23,
  hour: 23,
  minute: 11,
  second: 0,
}

function App() {
  return (
    <Page>
      <Countdown
        title="Starts in"
        format={["hours", "days", "seconds", "minutes"]}
        endDate={exampleEndDate}
      />
    </Page>
  )
}

export default App
