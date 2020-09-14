
export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) { // kind of like an if/else statement
  case 'ADD_TICKET':     // if the case is add ticket then do the following...
    return Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  case 'DELETE_TICKET': // else if the case is delete ticket then do this...
    const newState = { ...state };
    delete newState[id];
    return newState;
  default:
    return state;
  }
};