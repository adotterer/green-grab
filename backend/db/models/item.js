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

  Item.offerItem = async function ({ test }) {
    const { itemName, description, price, location } = test;

    const item = await Item.create({
      itemName,
      description,
      price,
      sellerId: 2,
      location,
    });
    console.log(item, "in /db/model/item.js");
    return "created item";
  };

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
