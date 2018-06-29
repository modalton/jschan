import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateBoard from "../create/create.jsx";
import CatalogThread from "../../components/catalogThread.jsx";
import BoardsBar from "../../components/boardsBar.jsx";

const mapStateToProps = store => {
  return {
    catalog: store.catalogReducer.catalog,
    board: store.homeReducer.boards.find(
      board => board.acronym === store.router.location.pathname.replace("/", "")
    ) || {
      acronym: "",
      title: ""
    }
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogThreads: board =>
    dispatch({ type: "CATALOG_FETCH_REQUESTED", payload: board })
});

class Catalog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCatalogThreads(this.props.match.params.board_id);
  }

  render() {
    return (
      <div>
        <div id="catalog">
          <br />
          {this.props.catalog.map((thread, i) => (
            <Link key={i} to={`/thread/${thread.post_id}`}>
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

          <CreateBoard type="board" context={this.props.board.acronym} />
          <br />
          <br />
          <br />
          <br />

          <Link to="/">Goto home</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
