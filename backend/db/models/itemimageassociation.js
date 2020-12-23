'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemImageAssociation = sequelize.define('ItemImageAssociation', {
    itemId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    primaryId: DataTypes.INTEGER
  }, {});
  ItemImageAssociation.associate = function(models) {
    // associations can be defined here
  };
  return ItemImageAssociation;
};