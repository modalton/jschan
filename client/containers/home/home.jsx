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
        <h2>Home</h2>
        <Link to="/login">Goto Login<br/></Link>
        <Link to="/bans">Goto Bans<br/></Link>
        {this.props.boards.map(board => (<Link to={`/board/${board.acronym}`}>{board.title}<br/></Link>))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
