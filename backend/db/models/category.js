"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryName: DataTypes.STRING,
    },
    {}
  );
  Category.associate = function (models) {
    const columnMapping = {
      through: "CategoryItemAssociation",
      otherKey: "itemId",
      foreignKey: "categoryId",
    };
    Category.belongsToMany(models.Item, columnMapping);
  };
  return Category;
};
