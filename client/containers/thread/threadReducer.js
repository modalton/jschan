function threadReducer(state = { posts: [] }, action) {
  switch (action.type) {
    case "THREAD_FETCH_SUCCEEDED":
      let posts = action.payload;
      return Object.assign({}, state, { posts });
    case "REPORT_POST_SUCCEEDED":
      console.log("payload", action.payload);
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default threadReducer;
