import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Statistic = (props) => (
  <p>{props.text} {props.number}</p>
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
    </div>
  )
}

export default App