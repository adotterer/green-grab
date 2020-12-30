const express = require("express");
// const { restoreUser } = require("../../../frontend/src/store/session");
const router = express.Router();
const { Item, User, Image, ItemImageAssociation } = require("../../db/models");

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

module.exports = router;
