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
    const { test } = req.body;

    const item = await Item.offerItem({ test });

    await setTokenCookie(res, item);

    return res.json({
      item,
    });
  })
);
