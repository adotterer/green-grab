"use strict";
module.exports = (sequelize, DataTypes) => {
  const ItemImageAssociation = sequelize.define(
    "ItemImageAssociation",
    {
      itemId: DataTypes.INTEGER,
      imageId: DataTypes.INTEGER,
      primaryId: DataTypes.INTEGER,
    },
    {}
  );
  /*********** ITEM/IMAGE METHODS *************/

  ItemImageAssociation.addImageToItem = async function (
    itemId,
    imageId,
    primaryId
  ) {
    ItemImageAssociation.create({
      itemId,
      imageId,
      primaryId,
    });
  };

  ItemImageAssociation.associate = function (models) {
    // associations can be defined here
  };
  return ItemImageAssociation;
};
