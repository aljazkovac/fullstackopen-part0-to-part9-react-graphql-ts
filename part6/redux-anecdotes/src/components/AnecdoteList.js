import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div>
            "{anecdote.content}" has {anecdote.votes} votes.
            <button onClick={handleVote}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log('State from AnecdoteList', state);
        if (state.filter === 'ALL') {
            console.log('STATE IS ALL');
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter) || 
                anecdote.votes.toString().includes(state.filter))
    })
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    return (
        <ul>
            {sortedAnecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVote={() => 
                    dispatch(voteForAnecdote(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList