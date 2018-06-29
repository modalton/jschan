function threadReducer(
  state = {
    posts: [],
    hoverObj: { hovering: false, coordinates: { x: 0, y: 0 }, post: {} }
  },
  action
) {
  switch (action.type) {
    case "THREAD_FETCH_SUCCEEDED":
      let posts = action.payload;
      return { ...state, posts };
    case "REPORT_POST_SUCCEEDED":
      return { ...state };
    case "TOGGLE_HOVERING":
      console.log("Heyx");
      return {
        ...state,
        hoverObj: {
          ...state.hoverObj,
          hovering: !state.hoverObj.hovering,
          coordinates: action.payload.coordinates,
          post: {
            ...state.posts.find(pst => pst.post_id === action.payload.post_id),
            mentions: [],
            actions: []
          }
        }
      };
    default:
      return state;
  }
}

export default threadReducer;
