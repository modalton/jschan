import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateBoard from "../create/create.jsx";
import CatalogThread from "../../components/catalogThread.jsx";

const mapStateToProps = store => {
  //Due to issue related https://github.com/ReactTraining/react-router/issues/5420 we can't use match.params.board_id
  //so we just manually take off the 'board/'. Hacky but there is no good solution
  return {
    catalog: store.boardCatalogReducer.catalog,
    board: store.homeReducer.boards.find(
      board =>
        board.acronym ===
          store.router.location.pathname.replace("/board/", "") || {
          acryonym: "",
          title: ""
        }
    )
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogThreads: board =>
    dispatch({ type: "CATALOG_FETCH_REQUESTED", payload: board })
});

class BoardCatalog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCatalogThreads(this.props.board.acronym);
  }

  //Put link in presentational component as well?
  render() {
    return (
      <div id="catalog">
        <h2>
          /{this.props.board.acronym}/-{this.props.board.title}
        </h2>
        <Link to="/">Goto home</Link>
        <br />
        {this.props.catalog.map((thread, i) => (
          <Link to={`/thread/${thread.post_id}`}>
            <CatalogThread
              key={i}
              title={thread.title}
              body={thread.body}
              picture_url={thread.picture_url}
              replies={thread.replies}
              images={thread.images}
            />
          </Link>
        ))}
        <br />
        <br />
        <br />
        <br />

        <CreateBoard type="board" context={this.props.match.params.board_id} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardCatalog);
