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
      include: { model: User },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
    res.json({ nearbyItems });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
