import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = (props) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    console.log('Filter: ', event)
    dispatch(filterChange(event))
  }

  return (
    <div>
      filter: 
      <input 
        type="input"
        name="filter"
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  )
}

export default Filter