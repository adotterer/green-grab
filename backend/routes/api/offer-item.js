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
    console.log(" ++++ ", itemName, ": itemName");
    console.log(" ++++ ", userId, ": userId");
    // add the item info to database
    // then, find it by ID
    // then send ID
    const productImageUrl = await singlePublicFileUpload(req.file);
    const imageUrlId = await Image.addImage(productImageUrl);
    // const itemId = await Item;
    console.log(" !!! imageUrlId", imageUrlId);
    // Item.addItem(data);
    // ItemImageAssociation.addImageToItem(imageURLId, itemId)
  })
);

module.exports = router;
