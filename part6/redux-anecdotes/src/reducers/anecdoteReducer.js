import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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

export const { voteForAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

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

export default anecdoteSlice.reducer