import React from "react";
import CollectionItem from "../CollectionItem/CollectionItem";
import "./CollectionPreview.scss";

const CollectionPreview = ({ title, items }) => {
  return (
    <div className="CollectionPreview">
      <h1 className="title animate__animated animate__slideInLeft">
        {title.toUpperCase()}
      </h1>
      <div className="preview animate__animated animate__slideInRight">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
