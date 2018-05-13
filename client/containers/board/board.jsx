import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  console.log(store)
  return {catalog:store.boardCatalogReducer.catalog}
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogThreads: (board)=> dispatch({type: 'CATALOG_FETCH_REQUESTED', payload: board})
});

class BoardCatalog extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchCatalogThreads('b');
  }
  
  render(){
    return (
      <div>
        <h2>Boardacious</h2>
        <Link to="/">Goto home</Link>
        {this.props.catalog && this.props.catalog.map(thread => (<div>Thread:</div>))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardCatalog);
