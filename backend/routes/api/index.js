const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const offerItemRouter = require("./offer-item.js");
const offersRouter = require("./offers.js");
const profileRouter = require("./profile.js");
const searchRouter = require("./search.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/offer-item", offerItemRouter);

router.use("/offers", offersRouter);

router.use("/profile", profileRouter);

router.use("/search", searchRouter);
/*********** TEST FRONTEND /API/TEST POST ROUTE *************/
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

/*********** TEST USER AUTH COOKIE *************/
// const { setTokenCookie } = require("../../utils/auth.js");
// const { User } = require("../../db/models");
// const { requireAuth } = require("../../utils/auth.js");
// const asyncHandler = require("express-async-handler");
// router.get(
//   "/set-token-cookie",
//   asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//       where: {
//         username: "Demo-lition",
//       },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
//   })
// );
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

module.exports = router;
