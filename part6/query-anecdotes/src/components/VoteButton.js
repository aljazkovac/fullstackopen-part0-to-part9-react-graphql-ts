import { useNotificationDispatch } from "../NotificationContext"

const handleVote = (anecdote, updateAnecdoteMutation, dispatch) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({ type: "vote", payload: anecdote.content });
    setTimeout(() => {
      dispatch({ type: '', payload: ''})
    }, 5000)
}

const VoteButton = ({ anecdote, updateAnecdoteMutation }) => {
    const dispatch = useNotificationDispatch()
    return (
      <button onClick={() => handleVote(anecdote, updateAnecdoteMutation, dispatch)}>
        vote
      </button>
    )
  }

export default VoteButton