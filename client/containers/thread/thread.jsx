import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Post from "../../components/post.jsx";
import ThreadPost from "../../components/threadPost.jsx";
import Create from "../create/create.jsx";

//The hover functionality is contained here. It seems like it could be a seperate class.
//Due to some conditions around thread state it seemed a little more tightly coupled
// to the thread class than the first glance. If it becomes too verbose you can revist this

const mapStateToProps = store => {
  return {
    posts: store.threadReducer.posts,
    hoverObj: store.threadReducer.hoverObj
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: thread_id =>
    dispatch({ type: "THREAD_FETCH_REQUESTED", payload: thread_id }),
  reportPost: (post_id, reason) =>
    dispatch({ type: "REPORT_POST_REQUESTED", payload: { post_id, reason } }),
  toggleHovering: (event, post_id) => {
    dispatch({
      type: "TOGGLE_HOVERING",
      payload: {
        coordinates: { x: event.clientX, y: event.clientY },
        post_id
      }
    });
  }
});

class Thread extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Get our argument from react router (the match prop)
    this.props.fetchPosts(this.props.match.params.thread_id);
  }

  render() {
    return (
      <div>
        <h2>Thread</h2>
        {this.props.hoverObj.hovering && (
          <div
            style={{
              position: "fixed",
              width: "400px",
              left: this.props.hoverObj.coordinates.x + 10,
              top: this.props.hoverObj.coordinates.y
            }}
          >
            <Post {...this.props.hoverObj.post} />
          </div>
        )}
        {this.props.posts.map((post, i, arr) => {
          if (i === 0) {
            return (
              <ThreadPost
                key={i}
                {...post}
                timestamp={Date.now()}
                mentions={arr
                  .filter(pst => pst.body.includes(post.post_id))
                  .map(pst => pst.post_id)}
                toggleHovering={this.props.toggleHovering}
                actions={[
                  {
                    name: "Report",
                    func: () => {
                      this.props.reportPost(post.post_id, "RULE_VIOLATION");
                    }
                  }
                ]}
              />
            );
          } else {
            return (
              <Post
                key={i}
                {...post}
                timestamp={Date.now()}
                mentions={arr
                  .filter(pst => pst.body.includes(post.post_id))
                  .map(pst => pst.post_id)}
                toggleHovering={this.props.toggleHovering}
                actions={[
                  {
                    name: "Report",
                    func: () => {
                      this.props.reportPost(post.post_id, "RULE_VIOLATION");
                    }
                  }
                ]}
              />
            );
          }
        })}
        <Create type="thread" context={this.props.match.params.thread_id} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
