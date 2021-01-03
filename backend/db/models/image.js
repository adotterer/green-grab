"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      URL: DataTypes.STRING,
    },
    {}
  );

  /*********** IMAGE METHODS *************/
  Image.addImage = async function (URL) {
    const image = await Image.create({
      URL,
    });
    return image.dataValues.id;
  };

  Image.associate = function (models) {
    const columnMapping = {
      through: "ItemImageAssociation",
      otherKey: "itemId",
      foreignKey: "imageId",
      onDelete: "CASCADE",
      hooks: true,
    };
    Image.belongsToMany(models.Item, columnMapping);
  };
  return Image;
};
