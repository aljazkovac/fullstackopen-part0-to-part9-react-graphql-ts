const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        console.log(state);
        return {...state, good: state.good+1}
      case 'OK':
        console.log(state);
        return {...state, ok: state.ok+1}
      case 'BAD':
        console.log(state);
        return {...state, bad: state.bad+1}
      case 'RESET':
        console.log(state);
        return {...state, good: 0, ok: 0, bad: 0}
      default: return state
    }
  }

  export const newVote = (type) => {
    return {
      type: type
    }
  }
  
  export default counterReducer