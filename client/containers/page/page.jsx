import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BoardsBar from "../../components/boardsBar.jsx";
import Catalog from "../catalog/catalog.jsx";
import Thread from "../thread/thread.jsx";

const mapStateToProps = store => {
  //Due to issue related https://github.com/ReactTraining/react-router/issues/5420 we can't use match.params.board_id
  //so we just manually take off the 'board/'. Hacky but there is no good solution
  return {
    board: store.homeReducer.boards.find(
      board => board.acronym === store.router.location.pathname.replace("/", "")
    ) || {
      acronym: "",
      title: ""
    },
    boards: store.homeReducer.boards
  };
};

const mapDispatchToProps = dispatch => ({
  toggleMainDisplay: board =>
    dispatch({ type: "TOGGLE_PAGE_DISPLAY", payload: board })
});

class Page extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.match);
  }
  render() {
    return (
      <div>
        <BoardsBar boards={this.props.boards} />
        <div className="pageElems">
          <img src="/banner1.gif" />
          <div className="boardTitle">
            /{this.props.board.acronym}/-{this.props.board.title}
          </div>
          <hr width="90%" />
          <div className="newThreadLink">[Start a New Thread]</div>
          <div className="boardAnnouncements">
            {new Date(Date.now()).toDateString()} - Some Fake Announcement - no
            one ever even reads these <br /> Anoother Fake Announcement - If you
            are still reading plz see a doctor for mental illness<br /> As I
            tiptoe through - the tulips, will you dance with me? As I tiptoe
            through the tulips - Bob
          </div>
          <hr />
        </div>
        <Route path="/:board_id/catalog" component={Catalog} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
