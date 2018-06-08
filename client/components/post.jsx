import React from "react";

//old action code. need to make component for drop down bc this looks terrible
// {actions.map(action => (
//   <div>
//     <button onClick={action.func}>{action.name}</button>
//   </div>
// ))}

const Post = ({
  is_thread,
  name,
  id,
  timestamp,
  post_num,
  title,
  body,
  picture_url,
  actions
}) => (
  <div className="post-container">
    <div class="side-arrows"> >> </div>
    <div id={post_num} className="reply">
      <div className="postHeader">
        <input type="checkbox" />
        <span className="name">{name ? name : "Anonymous"}</span> ID:({id}){" "}
        {new Date(timestamp).toDateString()} No.{post_num}
      </div>
      <div>
        File:<a href={`/${picture_url}`}>{picture_url}</a> (777 KB, 1100 x 720)
      </div>

      {picture_url && <img className="thumbnail" src={`/${picture_url}`} />}
      <div className="replyText">
        {title}
        {body}
      </div>
    </div>
  </div>
);

export default Post;
