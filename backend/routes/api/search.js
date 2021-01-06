const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Item, User, Image, Location } = require("../../db/models");
const { createLocationObj } = require("../../utils/geolocator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  console.log("helloooooo");
});

router.get("/location", async (req, res, next) => {
  const { location } = req.query;
  const locObj = await createLocationObj(location);
  const { latitude, longitude } = locObj;
  try {
    const nearbyItems = await Location.findAll({
      where: {
        latitude: { [Op.between]: [latitude - 2, latitude + 2] },
        longitude: { [Op.between]: [longitude - 2, longitude + 2] },
      },
      include: {
        model: User,
        include: { model: Item, include: { model: Image } },
      },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
    nearbyItems.forEach((item, i) => {
      console.log("THIS IS nearbyItems[i]");
      const locationCopy = {
        city: item.city,
        state: item.state,
      };
      console.log(locationCopy, "locationCopy btch");
      nearbyItems[i] = {
        ...item.dataValues.User.Items,
        User: { Location: locationCopy },
      };
      // nearbyItems[i].Item.User = { name: "booblepop" };
      // item.dataValues.Images = item.dataValues.
      // delete item.dataValues.User.Items;
    });
    console.log(nearbyItems, "nearbyItems mean bunny");
    // nearbyItems[0].dataValues.Items = nearbyItems[0].dataValues.User.Items;

    // console.log("NEARBYITEMS[0] MEAN BUNNY", nearbyItems[0].dataValues.User);
    res.json({ nearbyItems });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
