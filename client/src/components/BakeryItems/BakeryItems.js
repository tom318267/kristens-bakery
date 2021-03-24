import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../CollectionPreview/CollectionPreview";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import {
  fetchCollectionsStart,
  updateCollections,
} from "../../redux/shop/shop.actions";
import Spinner from "../Spinner/Spinner";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import "./BakeryItems.scss";

const BakeryItems = ({
  collections,
  fetchCollectionsStartAsync,
  isCollectionFetching,
}) => {
  useEffect(() => {
    fetchCollectionsStartAsync();
  }, []);

  return isCollectionFetching ? (
    <Spinner />
  ) : (
    <div className="BakeryItems">
      {collections.map(({ id, ...otherItemProps }) => (
        <CollectionPreview key={id} {...otherItemProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
  isCollectionFetching: selectIsCollectionFetching,
});

export default connect(mapStateToProps, { fetchCollectionsStartAsync })(
  BakeryItems
);
