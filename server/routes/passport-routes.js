const express = require("express");
const passport = require("passport");
const router = express.Router();
const cookie = require("cookie");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const steamUrls = require("../SteamUrl.js");
const axios = require("axios");

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
    res.cookie("userData", JSON.stringify(req.user), { httpOnly: true });
    res.redirect(`http://localhost:5173/?token=${req.user.steamId}`);
  }
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
//USer Inventory CS:GO by Steam ID
// router.post(
//   "/data/userImventory",
//   catchAsyncErrors(async (req, res, next) => {
//     const { steamId } = req.body;
//     console.log(process.env.STEAM_API_KEY, steamId);
//     const headers = {
//       'TRN-Api-Key': '3d89263a-f34a-45b9-b014-dc2ce951b96d',
//       'Accept': 'application/json',
//       'Accept-Encoding': 'gzip',
//     };
    
//     axios.get('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198447931512', { headers })
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         return next(new ErrorHandler(error.message, 500));
//       });
//     // const requestData = {
//     //   appid: '730',
//     //   'itemlist[0]': '120',
//     //   itemorigin: '',
//     //   steamid: steamId,
//     //   key: process.env.STEAM_API_KEY
//     // };
//     // try {
//     //   console.log(`${steamUrls.GetPlayerInventoySteamId}`);
//     //   const response = await axios.get(
//     //     `${steamUrls.GetPlayerInventoySteamId}`,{
//     //       params: requestData
//     //     }
//     //   );
//     //   console.log(response.data);
//     // }
//     // catch (error) {
//     //   return next(new ErrorHandler(error.message, 500));
//     // }
//     "https://api.steampowered.com/IEconItems_730/GetPlayerItems/v1/?access_token=64882127F2A6712358146C6A1F144FCA&steamid=76561198447931512"
//   })
// );

module.exports = router;
