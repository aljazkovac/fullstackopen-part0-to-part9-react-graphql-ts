import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer