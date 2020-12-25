"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      itemName: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      sellerId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
    },
    {}
  );
  Item.associate = function (models) {
    const columnMapping = {
      through: "ItemImageAssociation",
      otherKey: "imageId",
      foreignKey: "itemId",
    };
    Item.belongsToMany(models.Image, columnMapping);

    const columnMapping2 = {
      through: "CategoryItemAssociation",
      otherKey: "categoryId",
      foreignKey: "itemId",
    };
    Item.belongsToMany(models.Category, columnMapping2);
  };
  return Item;
};