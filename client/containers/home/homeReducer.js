function homeReducer(state = { boards: [] }, action) {
  switch (action.type) {
    case "BOARD_FETCH_SUCCEEDED":
      let boards = action.payload;
      return { ...state, boards };
    default:
      return state;
  }
}

export default homeReducer;
