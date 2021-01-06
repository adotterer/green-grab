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
    console.log("offers before they are sent back to frontend", offers);
    res.json({ offers: offers });
  } catch (e) {
    next(e);
  }
});

router.put("/edit", async (req, res, next) => {
  const { itemName, itemPrice, itemDescription, itemId } = req.body;
  const item = await Item.findByPk(itemId);
  try {
    const offer = await item.update({
      itemName: itemName,
      price: itemPrice,
      description: itemDescription,
    });
    res.json({ offer: offer });
  } catch (e) {
    next(e);
  }
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

router.delete("/delete", async (req, res, next) => {
  const { itemId } = req.body;
  try {
    const destroy = await Item.destroy({ where: { id: itemId } });
    res.json(destroy);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
