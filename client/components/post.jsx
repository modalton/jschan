import React from "react";

const Post = ({name,id,timestamp,post_num,title,body,picture_url,actions}) => (
  <div id={post_num} className="reply">
    <div className="postHeader">
      <span className="name">{name ? name : 'Anonymous'}</span> ID:({id}) No.{post_num}
    </div>
    {actions.map(action => (
      <div>
        <button onClick={action.func}>{action.name}</button>
      </div>
    ))}
    {picture_url!==undefined &&
     <img className="thumbnail" src={`/${picture_url}`}/>
    }
    <div className="replyText">
    {title}
    {body}
    </div>
  </div>
);

export default Post;
