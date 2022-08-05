import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = (props) => (
  <p>{props.text} {props.number} {props.percentage}</p>
)
const Statistics = (props) => (
  <>
    <StatisticLine text="Good" number={props.values[0]} />
    <StatisticLine text="Neutral" number={props.values[1]} />
    <StatisticLine text="Bad" number={props.values[2]} />
    <StatisticLine text="All" number={props.values[0]+
      props.values[1]+props.values[2]} />
    <StatisticLine text="Average" number={(props.values[0]-props.values[2]) / 
      (props.values[0]+props.values[1]+props.values[2])} />
    <StatisticLine text="Positive" number={props.values[0] / 
      (props.values[0]+props.values[1]+props.values[2])} percentage="%" />
</>
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
      <Statistics values={[good, neutral, bad]} />
    </div>
  )
}

export default App