function threadReducer(
  state = { posts: [], hoverObj: { hovering: false } },
  action
) {
  switch (action.type) {
    case "THREAD_FETCH_SUCCEEDED":
      let posts = action.payload;
      //      return Object.assign({}, state, { posts });
      return { ...state, posts };
    case "REPORT_POST_SUCCEEDED":
      return { ...state };
    case "TOGGLE_HOVERING":
      return {
        ...state,
        hoverObj: {
          ...state.hoverObj,
          hovering: !state.hoverObj.hovering
        }
      };
    default:
      return state;
  }
}

export default threadReducer;
