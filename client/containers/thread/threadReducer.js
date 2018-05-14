
function threadReducer(state = {posts:[]}, action){
  switch (action.type) {
  case 'THREAD_FETCH_SUCCEEDED':
    let posts = action.payload;
    console.log("posts = ", posts);
    return Object.assign({},state,{posts});
  default:
    return state;
  }
}

export default threadReducer;
