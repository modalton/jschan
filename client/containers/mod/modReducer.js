function BanReducer(state = {bans:[]}, action){
  switch (action.type) {
  case 'BAN_FETCH_SUCCEEDED':
    let bans = action.payload;
    return Object.assign({},state,{bans});
  default:
    return state;
  }
}

export default BanReducer;
