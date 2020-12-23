"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      URL: DataTypes.STRING,
    },
    {}
  );
  Image.associate = function (models) {
    const columnMapping = {
      through: "ItemImageAssociation",
      otherKey: "itemId",
      foreignKey: "imageId",
    };
    Image.belongsToMany(models.Item, columnMapping);
  };
  return Image;
};
