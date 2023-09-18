const express = require('express');
const passport = require('passport');
const router = express.Router();
const cookie = require('cookie'); 
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");


//==================================Auth Routes==================================
// Route for initiating Steam authentication
router.get(
  '/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

// Route for handling the Steam authentication callback
router.get(
  '/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    const token = 'your-custom-auth-token';

    res.cookie('userData', JSON.stringify(req.user), { httpOnly: true });

    res.redirect(`http://localhost:5173/?token=${req.user.steamId}`);
  }
);

router.get("/auth/user", catchAsyncErrors(async (req, res, next)=>{
    
  console.log(req.cookies);
  
  try{
      const userDataCookie = req.cookies.userData;
      if (userDataCookie) {
        const userData = JSON.parse(userDataCookie);
        res.json(userData);
      } else {
        return next(new ErrorHandler('No data found', 404));
      }
    }catch (error){
      return next(new ErrorHandler(error.message, 500));
    }
}))
//==================================User Data==================================



//send  user data need for a stem id get it from a post request? 
GetPlayerSummaries
router.get("/data/userSummaries", catchAsyncErrors(async (req, res, next)=>{
    
  
  try{

    }catch (error){
      return next(new ErrorHandler(error.message, 500));
    }
}))

// router.post('/data/userSummaries', catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { steamUserId } = req.body; // Acceder al Steam User ID desde el cuerpo de la solicitud
//     const apiKey = 'YOUR_API_KEY'; // Reemplaza con tu clave de API de Steam

//     const response = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamUserId}`);

//     if (response.status === 200) {
//       const player = response.data.response.players[0];

//       if (player) {
//         const profilePicture = player.avatarfull;
//         res.json({ profilePicture });
//       } else {
//         res.status(404).json({ error: 'Usuario no encontrado' });
//       }
//     } else {
//       res.status(500).json({ error: 'Error al obtener datos de Steam' });
//     }
//   } catch (error) {
//     next(error);
//   }
// }));



module.exports = router;