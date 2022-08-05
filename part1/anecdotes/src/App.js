import { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const findRandomAnecdote = (selected, anecdotes) => {
  var idx = Math.floor(Math.random()*(anecdotes.length-1))
  if (idx == selected && idx == anecdotes.length-1) {
    return 0
  }
  if (idx == selected) {
    return (idx+1)
  }
  return idx
}
const voteForAnecdote = (selected, votes) => {
  const copyVotes = [...votes]
  copyVotes[selected] += 1
  votes = copyVotes
  return votes
}
const DisplayVotes = (props) => (
  <p>The anecdote has {props.numberOfVotes} votes.</p>
)
const DisplayAnecdote = (props) => (
  <p>"{props.anecdote}"</p>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState((Array(anecdotes.length).fill(0)))
  console.log("Votes = ", votes)

  return (
    <div>
      <DisplayAnecdote anecdote={anecdotes[selected]} />
      <DisplayVotes numberOfVotes={votes[selected]} />
      <div>
        <Button handleClick={() => setVotes(voteForAnecdote(selected, votes))} text="Vote for anecdote" />
        <Button handleClick={() => setSelected(findRandomAnecdote(selected, anecdotes))} text="Next random anecdote" />
      </div>
    </div>
  )
}

export default App