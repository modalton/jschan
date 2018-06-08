import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return { boards: store.homeReducer.boards };
};

const mapDispatchToProps = dispatch => ({
  fetchBoards: () => dispatch({ type: "BOARD_FETCH_REQUESTED", payload: null })
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBoards();
  }

  render() {
    return (
      <div id="home">
        <div id="logo" style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Scooby Doo",
              fontSize: "46px",
              display: "inline-block"
            }}
          >
            JinkiesChan
          </div>
          <img
            style={{ height: "240px", verticalAlign: "middle" }}
            src="./velma.png"
          />
        </div>

        <br />
        <br />
        <br />
        <br />

        <div id="announcement">
          <div className="box-inner">
            <div className="boxbar">Announcement</div>
            <div className="boxcontent">
              JinkiesChan is for right now an attempt to clone 4chan, but will
              later move to be a replacement for vichan/tinyboard all in JS
              front and back. But for now it's a simple image-based bulletin
              board where anyone can post comments and share images. There are
              boards dedicated to a variety of topics, from Japanese animation
              and culture to videogames, music, and photography. Users do not
              need to register an account before participating in the community.
              Feel free to click on a board below that interests you and jump
              right in! Be sure to familiarize yourself with the Rules before
              posting, and read the FAQ if you wish to learn more about how to
              use the site.
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="box-inner">
          <div className="boxbar">
            <h2>Boards</h2>
          </div>
          <div className="boxcontent">
            <h3 style={{ textDecoration: "underline" }}>Current Ones</h3>
            {this.props.boards.map((board, i) => (
              <Link key={i} to={`/board/${board.acronym}`}>
                {board.title}
                <br />
              </Link>
            ))}
          </div>
        </div>

        <h2>Home</h2>
        <Link to="/login">
          Goto Login<br />
        </Link>
        <Link to="/bans">
          Goto Bans<br />
        </Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
