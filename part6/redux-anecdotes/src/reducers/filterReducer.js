const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'filter':
        return action.payload
      default:
        return state
    }
  }
  
  export const filterChange = filter => {
    return {
      type: 'filter',
      payload: filter,
    }
  }
  
  export default filterReducer