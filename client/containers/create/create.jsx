import React, { Component } from "react";
import { connect } from 'react-redux';

//Depending on if your on a board or thread (context) we display a few different things & use different apis
const mapStateToProps = (store,ourProps) => {
  return {context:ourProps.context,type:ourProps.type};
};

const mapDispatchToProps = dispatch => ({
  createThread: (form,board)=> dispatch({type: 'NEW_THREAD_REQUESTED', payload: {form,board}}),
  createComment: (form,thread_id)=> dispatch({type: 'NEW_COMMENT_REQUESTED',payload:{form,thread_id}})
});

class CreatePost extends Component{

  constructor(props){
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //Can't seem to initialize w/ form. Look into this. Would be much prettier
    let form = new FormData();
    form.append('picture',this.refs.picture.files[0]);
    form.append('body',this.refs.body.value);
    form.append('title',this.refs.body.title);
    if(this.props.type === 'board'){
      for(var pair of form.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
      }
      return this.props.createThread(form,this.props.context);
    }
    this.props.createComment(form,this.props.context);
    
    
  }
  
  render(){
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          { this.props.type === 'board' &&
            <div>
                Title:<input ref="title" name="title" type="text"/>
            </div>              
            }
            Body:<input ref="body" name="body" type="text"/><br/>
            <input ref="picture" name="picture" type="file" accept="/image"/><br/>
            <button type="submit">Post</button>

        </form>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
