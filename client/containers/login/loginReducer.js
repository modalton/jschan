function LoginReducer(state = {isLoggedIn:false}, action){
  switch (action.type) {
  case 'LOGIN_SUCCEEDED':
    return Object.assign({},state,{isLoggedIn:true});
  default:
    return state;
  }
}

export default LoginReducer;
