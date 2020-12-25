const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Item } = require("../../db/models");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { itemName, itemPrice, itemImage, itemDescription } = req.body;

    const item = await Item.offerItem({
      itemName,
      itemPrice,
      // itemImage,
      itemDescription,
    });
    console.log(
      "HELLO FROM OFFER-ITEM API",
      itemName,
      itemPrice,
      itemImage,
      itemDescription
    );
    return res.json({
      item,
    });
  })
);

module.exports = router;
