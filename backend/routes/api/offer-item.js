const express = require("express");
const router = express.Router();
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Item, Image } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.post(
  "/upload",
  singleMulterUpload("image"),
  asyncHandler(async function (req, res) {
    const productImageUrl = await singlePublicFileUpload(req.file);
    console.log(productImageUrl);
    Image.addImage(productImageUrl);

    console.log("Image URL saved in database.");
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
