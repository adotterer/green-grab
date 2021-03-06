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

  Item.offerItem = async function (
    itemName,
    itemPrice,
    itemDescription,
    userId
  ) {
    const item = await Item.create({
      itemName,
      price: itemPrice,
      sellerId: userId,
      description: itemDescription,
    });

    return item.dataValues.id;
  };

  Item.associate = function (models) {
    Item.belongsTo(models.User, { foreignKey: "sellerId" });

    const columnMapping = {
      through: "ItemImageAssociation",
      otherKey: "imageId",
      foreignKey: "itemId",
      onDelete: "CASCADE",
      hooks: true,
    };
    Item.belongsToMany(models.Image, columnMapping);

    // const columnMapping2 = {
    //   through: "CategoryItemAssociation",
    //   otherKey: "categoryId",
    //   foreignKey: "itemId",
    // };
    // Item.hasMany(models.Category, columnMapping2);
  };
  return Item;
};
