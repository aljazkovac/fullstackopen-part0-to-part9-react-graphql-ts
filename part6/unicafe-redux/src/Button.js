import { useDispatch } from "react-redux";  
import { newVote } from "./reducer"

const Button = (props) => {
    const dispatch = useDispatch()

    const vote = (event) => {
        event.preventDefault()
        dispatch(newVote(props.type)) 
    }
    return (
        <button type="submit" onClick={vote}>{props.type}</button>
    )
}

export default Button