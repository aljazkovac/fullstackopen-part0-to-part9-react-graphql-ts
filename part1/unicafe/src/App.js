import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistic = (props) => (
  <p>{props.text} {props.number} {props.percentage}</p>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={() => setBad(bad+1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistic text="Good" number={good} />
      <Statistic text="Neutral" number={neutral} />
      <Statistic text="Bad" number={bad} />
      <Statistic text="All" number={good+neutral+bad} />
      <Statistic text="Average" number={(good-bad)/(good+bad+neutral)} />
      <Statistic text="Positive" number={good/(good+bad+neutral)} percentage="%" />
    </div>
  )
}

export default App