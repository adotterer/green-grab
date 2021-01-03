const express = require("express");
// const { restoreUser } = require("../../../frontend/src/store/session");
const router = express.Router();
const { Item, User, Image, Location } = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const offers = await Item.findAll({
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
    res.json({ offers: offers });
  } catch (e) {
    next(e);
  }
});

router.put("/edit", async (req, res, next) => {
  console.log(req.body, "req.body");
  const { itemName, itemId } = req.body;
  const item = await Item.findByPk(itemId);
  await item.update({
    itemName: itemName,
  });
  console.log(item, "updated?");
});

router.get("/single", async (req, res, next) => {
  const { id } = req.query;

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
    res.json({ offer: offer });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
