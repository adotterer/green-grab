const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Location } = require("../../db/models");
const { createLocationObj } = require("../../utils/geolocator");

const router = express.Router();

// VALIDATION
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// SIGN UP
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, location } = req.body;
    const locObj = await createLocationObj(location);
    const user = await User.signup({ email, username, password, locObj });
    locObj.userId = user.id;

    await Location.addUserLocation(locObj);

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
