import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Post from "../../components/post.jsx";
import ThreadPost from "../../components/threadPost.jsx";
import CreateBoard from "../create/create.jsx";

const mapStateToProps = store => {
  return { posts: store.threadReducer.posts };
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: thread_id =>
    dispatch({ type: "THREAD_FETCH_REQUESTED", payload: thread_id }),
  reportPost: (post_id, reason) =>
    dispatch({ type: "REPORT_POST_REQUESTED", payload: { post_id, reason } })
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
        {this.props.posts.map((post, i) => {
          if (i === 0) {
            return (
              <ThreadPost
                key={i}
                is_thread={i === 0 ? true : false}
                name={post.name}
                post_num={post.post_id}
                id={post.id_token}
                timestamp={Date.now()}
                title={post.title}
                body={post.body}
                picture_url={post.picture_url}
                actions={[
                  {
                    name: "Report",
                    func: this.props.reportPost.bind(
                      this,
                      post.post_id,
                      "RULE_VIOLATION"
                    )
                  }
                ]}
              />
            );
          } else {
            return (
              <Post
                key={i}
                is_thread={i === 0 ? true : false}
                name={post.name}
                post_num={post.post_id}
                id={post.id_token}
                timestamp={Date.now()}
                title={post.title}
                body={post.body}
                picture_url={post.picture_url}
                actions={[
                  {
                    name: "Report",
                    func: this.props.reportPost.bind(
                      this,
                      post.post_id,
                      "RULE_VIOLATION"
                    )
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
