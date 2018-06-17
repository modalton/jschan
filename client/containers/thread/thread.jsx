import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Post from "../../components/post.jsx";
import ThreadPost from "../../components/threadPost.jsx";
import CreateBoard from "../create/create.jsx";

//The hover functionality is contained here. It seems like it could be a seperate class.
//Due to some conditions around thread state it seemed a little more tightly coupled
// to the thread class than the first glance. If it becomes too verbose you can revist this

const mapStateToProps = store => {
  return {
    posts: store.threadReducer.posts,
    hoverObj: store.threadReducer.hoverObj
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: thread_id =>
    dispatch({ type: "THREAD_FETCH_REQUESTED", payload: thread_id }),
  reportPost: (post_id, reason) =>
    dispatch({ type: "REPORT_POST_REQUESTED", payload: { post_id, reason } }),
  toggleHovering: event => {
    console.log(event.clientX, event.clientY);
    dispatch({
      type: "TOGGLE_HOVERING",
      payload: { coordinate: { x: event.clientX, y: event.clientY } }
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

  //Look into destructuring/spreading post into input params
  render() {
    return (
      <div>
        <h2>Thread</h2>
        {this.props.hoverObj.hovering && <div>Hover Div</div>}
        {this.props.posts.map((post, i, arr) => {
          if (i === 0) {
            return (
              <ThreadPost
                key={i}
                is_thread={i === 0 ? true : false}
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
                is_thread={i === 0 ? true : false}
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
        <CreateBoard
          type="thread"
          context={this.props.match.params.thread_id}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
