const express = require("express");
const passport = require("passport");
const router = express.Router();
const cookie = require("cookie");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const steamUrls = require("../SteamUrl.js");
const axios = require("axios");


function deleteCookies(res) {
  res.clearCookie('userData');
}
//==================================Auth Routes==================================
// Route for initiating Steam authentication
router.get(
  "/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

// Route for handling the Steam authentication callback
router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    console.log(req.user);
    
    res.cookie("userData", JSON.stringify(req.user), { httpOnly: true });
    res.redirect(`http://localhost:5173/login/${req.user.steamId}`);
  }
);

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

router.get(
  "/auth/steam/logOut",
  catchAsyncErrors(async (req, res, next) => {
    try {
      deleteCookies(res);
      res.redirect(`http://localhost:5173`);

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/auth/user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userDataCookie = req.cookies.userData;
      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        res.json(userData);
      } else {
        return next(new ErrorHandler("No data found", 404));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//==================================User Data==================================

//User profile info
router.post(
  "/data/userSummaries",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { steamId } = req.body;
      const response = await axios.get(
        `${steamUrls.GetPlayerSummaries}?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
      );
      if(response.data.response.players[0]){
        res.status(201).json({
          success: true,
          data: response.data.response.players[0],
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404'
          },
        });
      }

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
