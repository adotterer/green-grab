const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Item, User, Image, Location } = require("../../db/models");
const { createLocationObj } = require("../../utils/geolocator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  const { term, location } = req.query;
  // console.log("Why doesn't this work ---> location: ", !!location);

  try {
    let queryResults;
    if (location.length) {
      // No location given
      queryResults = await Item.findAll({
        where: {
          itemName: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("itemName")),
            "LIKE",
            "%" + term + "%"
          ),
          // description: Sequelize.where(
          //   Sequelize.fn("LOWER", Sequelize.col("description")),
          //   "LIKE",
          //   "%" + term + "%"
          // ),
        },
        include: [
          {
            model: Image,
          },
          {
            model: User,
            include: { model: Location },
          },
        ],
      });
    } else if (location && location != " ") {
      const locObj = await createLocationObj(location);
      const { latitude, longitude } = locObj;
      console.log(" i have both term and location", term, location);
      queryResults = await Item.findAll({
        where: {
          itemName: Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("itemName")),
            "LIKE",
            "%" + term + "%"
          ),
          // description: Sequelize.where(
          //   Sequelize.fn("LOWER", Sequelize.col("description")),
          //   "LIKE",
          //   "%" + term + "%"
          // ),
        },
        include: [
          {
            model: User,
            include: {
              model: Location,
              where: {
                latitude: { [Op.between]: [latitude - 2, latitude + 2] },
                longitude: { [Op.between]: [longitude - 2, longitude + 2] },
              },
            },
          },
          { model: Image },
        ],
      });
    } else {
      console.log("LINE43", term, location);
    }

    console.log("queryResults --->", queryResults);
    res.json({ queryResults });
  } catch (e) {
    next(e);
  }
});

router.get("/location", async (req, res, next) => {
  const { location } = req.query;
  const locObj = await createLocationObj(location);
  const { latitude, longitude } = locObj;
  // Maybe this should just be querying for Items instead
  // so I don't have to restructure the whole object
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
        item.dataValues.User = {
          id: nearbyLocations[i].User.id,
          Location: locationCopy,
        };
        nearbyItems.push(item);
      });
    });

    res.json({ nearbyItems });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
