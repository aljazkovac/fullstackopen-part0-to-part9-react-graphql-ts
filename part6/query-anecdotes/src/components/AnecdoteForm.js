import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onError: (error) => {
      console.log("Error from useMutation:", error);
      console.log(error.response.data.error);
      dispatch({ type: "error", payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: '', payload: ''})
      }, 5000)
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
    dispatch({ type: "create", payload: content });
    setTimeout(() => {
      dispatch({ type: '', payload: ''})
    }, 5000)
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
