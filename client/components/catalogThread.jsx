import React from "react";

const CatalogThread = ({ replies, images, title, body, picture_url }) => (
  <div className="catalogThread">
    {picture_url !== undefined && (
      <img className="threadThumbnail" src={`/${picture_url}`} />
    )}

    <div className="brief">
      R:<b>{replies}</b> / I:<b>{images}</b>
      <br />
      <div className="teaser">
        <b>{title}: </b>
        {body}
      </div>
    </div>
  </div>
);

export default CatalogThread;
