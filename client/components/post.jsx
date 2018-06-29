import React from "react";

//Seems to be babel bug for following argument code (which works in repl)
// to be investigated another day
// { ...args } = {},
//   {
//     name,
//     id_token,
//     timestamp,
//     post_id,
//     title,
//     body,
//     picture_url,
//     actions,
//     toggleHovering,
//     mentions
//   } =  args

//old action code. need to make component for drop down bc this looks terrible
// {actions.map(action => (
//   <div>
//     <button onClick={action.func}>{action.name}</button>
//   </div>
// ))}

const Post = ({
  name,
  id_token,
  timestamp,
  post_id,
  title,
  body,
  picture_url,
  actions,
  toggleHovering,
  mentions
}) => (
  <div className="post-container">
    <div className="side-arrows"> >> </div>
    <div id={post_id} className="reply">
      <div className="postHeader">
        <input type="checkbox" />
        <span className="name">{name ? name : "Anonymous"}</span> ID:({id_token}){" "}
        {new Date(timestamp).toDateString()} No.{post_id}
        {mentions.map((mention, i) => (
          <a
            key={i}
            onMouseOver={e => {
              toggleHovering(e, mention);
            }}
            href={`#${mention}`}
            className="quotelink"
          >
            {" "}
            >>{mention}
          </a>
        ))}
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
