import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVotes(state, action) {
      const anecdote = action.payload
      const id = anecdote.id
      console.log('Voted for anecdote: ', anecdote);
      return state.map(a => a.id !== id ? a : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateVotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const votedForAnecdote = await anecdoteService.voteForAnecdote(anecdote)
    dispatch(updateVotes(votedForAnecdote))
  }
}

export default anecdoteSlice.reducer