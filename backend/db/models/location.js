"use strict";
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  /*********** LOCATION METHODS *************/
  Location.addUserLocation = async function (locObj) {
    const { latitude, longitude, city, state, userId } = locObj;

    const userLocation = await Location.create({
      latitude,
      longitude,
      city,
      state,
      userId,
    });

    return userLocation;
  };

  Location.associate = function (models) {
    // associations can be defined here
    Location.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Location;
};
