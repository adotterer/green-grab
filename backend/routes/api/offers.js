const express = require("express");
// const { restoreUser } = require("../../../frontend/src/store/session");
const router = express.Router();
const { Item, User, Image } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const offers = await Item.findAll({
      include: [
        {
          model: Image,
        },
        {
          model: User,
        },
      ],
    });
    res.json({ offers: offers });
  } catch (e) {
    next(e);
  }
});

router.get("/single", async (req, res, next) => {
  const { id } = req.query;
  console.log("HERE IS ID!", id);
  try {
    const offer = await Item.findByPk(id, {
      include: [
        {
          model: Image,
        },
        {
          model: User,
        },
      ],
    });
    console.log(offer);
    res.json({ offer: offer });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
