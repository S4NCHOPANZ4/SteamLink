const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const router = express.Router();
const User = require("../model/UserModel.js");
const axios = require("axios");
const steamUrls = require("../SteamUrl");

//Create - Find User
router.post(
  "/createUser",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const foundUser = await User.findOne({ steamid: id });

    if (foundUser) {
      res.status(201).json({
        success: true,
        user: foundUser,
      });
    } else {
      const response = await axios.get(
        `${steamUrls.GetPlayerSummaries}?key=${process.env.STEAM_API_KEY}&steamids=${id}`
      );
      const { steamid, personaname, avatar, avatarmedium, avatarfull } =
        response.data.response.players[0];
      const newUser = await User.create({
        steamid: steamid,
        username: personaname,
        avatar: avatar,
        avatarmedium: avatarmedium,
        avatarfull: avatarfull,
        balance: 0.0,
      });
      res.status(201).json({
        success: true,
        user: newUser,
      });
    }

    try {
      console.log(id);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Use Demo account

router.get( 
  "/demoAccount",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("userData", JSON.stringify({ steamId: '000000000', displayName: "DemoAccount"}), { httpOnly: true });
      res.redirect(`http://localhost:5173/login/000000000`);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Auth user
router.post(
  "/authUser",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId } = req.body;

      const foundUser = await User.findOne({ steamid: steamId });

      if (foundUser) {
        res.status(201).json({
          success: true,
          user: foundUser,
        });
      } else {
        res.status(201).json({
          success: true,
          user: {},
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
