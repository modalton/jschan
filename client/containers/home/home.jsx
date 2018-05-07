import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return {boards:store.boards}
};

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
  temp: (e)=> {dispatch({type: 'BOARD_FETCH_REQUESTED', payload: 'muh payloadus'})}
});

class Home extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.temp('hi');
  }
  
  render(){
    return (
      <div>
        <h2>Homeogenous</h2>
        <Link to="/board">Goto board</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
