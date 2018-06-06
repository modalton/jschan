import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return {isLoggedIn:store.loginReducer.isLoggedIn};
};

const mapDispatchToProps = dispatch => ({
  attemptLogin: (username,password)=> dispatch({type: 'LOGIN_REQUESTED', payload: {username,password}})
});

class Login extends Component{

  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div>
        <h2>Login</h2>
        <Link to="/">Go to Home</Link><br/>
        Username:<input ref="username" type="text"/><br/>
        Password:<input ref="password" type="password"/><br/>
        <button type="submit" onClick={()=>{this.props.attemptLogin(this.refs.username.value,this.refs.password.value);}}>Login</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
