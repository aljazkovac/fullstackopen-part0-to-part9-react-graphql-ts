import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onError: (error) => {
      console.log("Error from useMutation:", error);
    },
    onSuccess: (newAnecdote) => {
      console.log('New anecdote', newAnecdote)
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
