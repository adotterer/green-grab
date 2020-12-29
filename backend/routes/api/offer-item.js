const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Item, Image, ItemImageAssociation } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async function (req, res) {
    const { itemName, itemPrice, itemDescription, userId } = req.body;
    if (!userId) return;
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
    //  Right now you can only upload one image, so that is the default primary

    const primaryId = imageUrlId;

    const itemImageJoinId = await ItemImageAssociation.addImageToItem(
      itemId,
      imageUrlId,
      primaryId
    );

    // console.log(" ++++ ", itemImageJoinId, ": itemImageJoinId");
    const item = {
      itemName,
      itemPrice,
      itemDescription,
      userId,
      productImageUrl,
    };

    // To Do: figure out what the heck to do here

    return res.json({
      item,
    });
  })
);

module.exports = router;
