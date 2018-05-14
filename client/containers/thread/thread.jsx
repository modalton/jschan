import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  return {posts:store.threadReducer.posts};
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: (thread_id)=> dispatch({type: 'THREAD_FETCH_REQUESTED', payload: thread_id})
});

class Thread extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //Get our argument from react router (the match prop) 
    this.props.fetchPosts(this.props.match.params.thread_id);
  }
  
  render(){
    return (
      <div>
        <h2>Thread</h2>
        {this.props.posts.map(post => (<div>Post:{post.title} | {post.body} {'\n'}</div>))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
