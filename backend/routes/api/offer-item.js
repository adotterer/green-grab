const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Item } = require("../../db/models");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("req.files", req.files);
    // const { itemName, itemPrice, itemImage, itemDescription } = req.body;

    // const item = await Item.offerItem({
    //   itemName,
    //   itemPrice,
    //   itemImage,
    //   itemDescription,
    // });
    // console.log(
    //   "HELLO FROM OFFER-ITEM API",
    //   itemName,
    //   itemPrice,
    //   itemImage,
    //   itemDescription
    // );
    // return res.json({
    //   item,
    // });
  })
);

router.post(
  "/upload",
  asyncHandler(async function (req, res) {
    console.log(req.body);
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send("No files were uploaded.");
    // }

    // const { image } = req.body;
    // // console.log("req.body", image);

    // image.mv("/images/test.png", function (err) {
    //   if (err) return res.status(500).send(err);

    //   res.send("File uploaded!");
    // });

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let sampleFile = req.body;
    // console.log(sampleFile);
    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv("../../images/image.png", function (err) {
    //   if (err) return res.status(500).send(err);

    //   res.send("File uploaded!");
    // });
  })
);

module.exports = router;
