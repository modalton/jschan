import React from "react";
import { Link } from "react-router-dom";

const BoardsBar = ({ boards }) => (
  <div className="boardsBar">
    [
    {boards.map((board, i, arr) => (
      <span key={i}>
        <Link key={i} to={board.acronym}>
          {board.acronym}
        </Link>
        {i !== arr.length - 1 && "/"}
      </span>
    ))}
    ]
  </div>
);

export default BoardsBar;
