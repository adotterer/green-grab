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
    // remember, this cannot be an arrow function
    const image = await Image.create({
      URL
    });
    return "!! ~ replace this with created URL id ~ !!";
  };


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
