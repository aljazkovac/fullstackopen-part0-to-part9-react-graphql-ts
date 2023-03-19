import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      // We can mutate state directly thanks to the Immer library.
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
    },
    voteForAnecdote(state, action) {
      console.log('State from anecdoteReducer', JSON.parse(JSON.stringify(state)))
      const id = action.payload
      const anecdoteToVoteFor = state.find(n => n.id === id)
      const votedForAnecdote = {
        ...anecdoteToVoteFor,
        votes: anecdoteToVoteFor.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedForAnecdote)
    }
  }
})

export const { createAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer