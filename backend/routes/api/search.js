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
    const nearbyLocations = await Location.findAll({
      where: {
        latitude: { [Op.between]: [latitude - 2, latitude + 2] },
        longitude: { [Op.between]: [longitude - 2, longitude + 2] },
      },
      include: {
        model: User,
        include: {
          model: Item,
          where: {
            sellerId: { [Op.not]: null },
          },
          include: { model: Image },
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    nearbyItems = [];
    nearbyLocations.forEach((item, i) => {
      const locationCopy = {
        city: item.city,
        state: item.state,
      };
      item.dataValues.User.Items.forEach((item) => {
        item.dataValues.User = { Location: locationCopy };
        nearbyItems.push(item);
      });
      // console.log("itemArr[1]", itemArr[1]);
      // nearbyItems[i] = {
      //   ...item.dataValues.User.Items,
      // };
      // console.log(
      //   "type of item.dataValues.User.Items",
      //   Array.isArray(item.dataValues.User.Items),
      //   item.dataValues.User.Items[0]
      // );
      // nearbyItems[i].Item.User = { name: "booblepop" };
      // item.dataValues.Images = item.dataValues.
      // delete item.dataValues.User.Items;
    });
    // console.log("just give me what i want", itemArr);
    // nearbyItems[0].dataValues.Items = nearbyItems[0].dataValues.User.Items;

    // console.log("NEARBYITEMS[0] MEAN BUNNY", nearbyItems[0].dataValues.User);
    res.json({ nearbyItems });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
