import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return {boards:store.homeReducer.boards};
};

const mapDispatchToProps = dispatch => ({
  fetchBoards: ()=> dispatch({type: 'BOARD_FETCH_REQUESTED', payload: null})
});

class Home extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchBoards();
  }
  
  render(){
    return (
      <div>
        <h2>Homeogenous</h2>
        {this.props.boards.map(board => (<div>Board: /{board.acronym}</div>))}
        <Link to="/board">Goto board</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
