import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return {catalog:store.catalog}
};

const mapDispatchToProps = dispatch => ({
  // create functions that will dispatch action creators
  temp: (e)=> {console.log('dispatching');dispatch({type: 'BOARD_CATALOG_FETCH_REQUESTED', payload: 'b'})}
});

class BoardCatalog extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.temp('hi');
  }
  
  render(){
    return (
      <div>
        <h2>Boardacious</h2>
        <Link to="/">Goto home</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardCatalog);
