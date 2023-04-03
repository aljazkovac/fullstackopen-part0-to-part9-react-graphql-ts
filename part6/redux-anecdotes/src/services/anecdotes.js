import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteForAnecdote = async (anecdote) => {
  const votedForAnecdote = {
    ...anecdote,
    votes: anecdote.votes+1
  }
  console.log('Voted for anecdote from service: ', votedForAnecdote);
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, votedForAnecdote)
  return response.data
}

const anecdoteService = { getAll, createNew, voteForAnecdote }

export default anecdoteService