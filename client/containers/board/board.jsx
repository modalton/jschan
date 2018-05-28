import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateBoard from "../create/create.jsx";
import CatalogThread from "../../components/catalogThread.jsx";

const mapStateToProps = store => {
  return {catalog:store.boardCatalogReducer.catalog};
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogThreads: (board)=> dispatch({type: 'CATALOG_FETCH_REQUESTED', payload: board})
});

class BoardCatalog extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchCatalogThreads(this.props.match.params.board_id);
  }
  
  //Put link in presentational component as well?
  render(){
    return (
      <div>
        <h2>Boardacious</h2>
        <CreateBoard type = "board" context={this.props.match.params.board_id}/>
        <Link to="/">Goto home</Link>
        { this.props.catalog.map(thread => (
          <Link to={`/thread/${thread.post_id}`}>
            <CatalogThread
              title={thread.title}
              body={thread.body}
              picture_url={thread.picture_url}
              replies={thread.replies}
              images={thread.images}/>
          </Link>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardCatalog);
