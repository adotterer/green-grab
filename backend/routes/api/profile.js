const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User, Item, Image, Location } = require("../../db/models");
// const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.get("/", async (req, res, next) => {
  const { userId } = req.query;

  try {
    const profile = await User.findByPk(userId, {
      include: [
        {
          model: Item,
          include: [{ model: Image }],
        },
        { model: Location },
      ],

      //   {
      //     model: Images,
      //   },
      // ],
    });
    res.json({ profile: profile });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
