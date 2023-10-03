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

//removeFromBalance 
router.post(
  "/removeFromBalance",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId, amount  } = req.body;

      const user = await User.findOne({ steamid: steamId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.removeFromBalance(amount).then((updatedUser) =>{
        return res.status(200).json({
          success: true,
          user: updatedUser,
        });
      })


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Add Item to inventory
router.post(
  "/addItem",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId , newItem } = req.body;

      const user = await User.findOne({ steamid: steamId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.addToInventory({
        id: newItem.id,
        name: newItem.name,
        rarity: newItem.rarity, 
        image: newItem.image,
        value: newItem.value
      }).then((updatedUser) =>{
        return res.status(200).json({
          success: true,
          user: updatedUser,
        });
      })


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//sell last added
router.post(
  "/sellLastAdded",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId  } = req.body;

      const user = await User.findOne({ steamid: steamId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const toDelete = user.Inventory[user.Inventory.length - 1]
      user.removeFromInventory(toDelete._id).then((updatedUser) =>{
        return res.status(200).json({
          success: true,
          user: updatedUser,
        });
      })


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//sell item
router.post(
  "/sellItem",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId, itemId  } = req.body;

      const user = await User.findOne({ steamid: steamId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.removeFromInventory(itemId).then((updatedUser) =>{
        return res.status(200).json({
          success: true,
          user: updatedUser,
        });
      })


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Add to Balance
router.post(
  "/addBalance",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId, amount  } = req.body;

      const user = await User.findOne({ steamid: steamId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      user.addToBalance(amount).then((updatedUser) =>{
        return res.status(200).json({
          success: true,
          user: updatedUser,
        });
      })


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
