const express = require("express");
const router = express.Router();
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Item } = require("../../db/models");
const fileUpload = require("express-fileupload");
const upload = multer();

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
  upload.none(),
  asyncHandler(async function (req, res) {
    console.log(req.body);
    // const fileName = req.files.myFile.name;
    // console.log("fileName", fileName);
    // const path = __dirname + "/images/" + fileName;

    // image.mv(path, (error) => {
    //   if (error) {
    //     console.error(error);
    //     res.writeHead(500, {
    //       "Content-Type": "application/json",
    //     });
    //     res.end(JSON.stringify({ status: "error", message: error }));
    //     return;
    //   }

    //   res.writeHead(200, {
    //     "Content-Type": "application/json",
    //   });
    //   res.end(
    //     JSON.stringify({ status: "success", path: "/img/houses/" + fileName })
    //   );
    // });
  })
);

module.exports = router;
