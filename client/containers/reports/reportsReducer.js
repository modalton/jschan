function reportsReducer(state = { reports: [] }, action) {
  switch (action.type) {
    case "REPORTS_FETCH_SUCCEEDED":
      let reports = action.payload;
      return { ...state, reports };
    default:
      return state;
  }
}

export default reportsReducer;
