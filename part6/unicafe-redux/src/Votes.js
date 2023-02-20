import { useSelector } from 'react-redux'

const Votes = () => {
    const votes = useSelector(state => state)

    return(
        <div>
        <p>GOOD: {votes.good}</p>
        <p>OK: {votes.ok}</p>
        <p>BAD: {votes.bad}</p>
        </div>
    )
}

export default Votes