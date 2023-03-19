import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer
}

const store = configureStore({ reducer: reducer })

export default store