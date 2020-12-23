'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryItemAssociation = sequelize.define('CategoryItemAssociation', {
    categoryId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  CategoryItemAssociation.associate = function(models) {
    // associations can be defined here
  };
  return CategoryItemAssociation;
};