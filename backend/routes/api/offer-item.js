const express = require("express");
const router = express.Router();
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Item, Image, ItemImageAssociation } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async function (req, res) {
    const { itemName, itemPrice, itemDescription, userId } = req.body;
    // console.log(" ++++ ", itemName, ": itemName");
    // console.log(" ++++ ", userId, ": userId");

    const productImageUrl = await singlePublicFileUpload(req.file);
    const imageUrlId = await Image.addImage(productImageUrl);

    const itemId = await Item.offerItem(
      itemName,
      itemPrice,
      itemDescription,
      userId
    );

    //  TO DO: CHANGE primaryId to be the thumbnail image for the entire site
    const primaryId = imageUrlId;

    const itemImageJoinId = await ItemImageAssociation.addImageToItem(
      itemId,
      imageUrlId,
      primaryId
    );

    console.log(" ++++ ", itemImageJoinId, ": itemImageJoinId");
  })
);

module.exports = router;
