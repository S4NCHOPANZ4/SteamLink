const express = require('express');
const passport = require('passport');
const router = express.Router();
const cookie = require('cookie'); 
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

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

    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);

//Route to get Auth user stored in the cookies
// router.get('/auth/user', (req, res) => {
//   // Verifica si existe la cookie 'userData' en la solicitud
//   const userDataCookie = req.cookies.userData;
//   if (userDataCookie) {
//     // La cookie 'userData' fue encontrada en la solicitud, puedes acceder a su valor
//     const userData = JSON.parse(userDataCookie);

//     // Devuelve los datos del usuario almacenados en la cookie
//     res.json(userData);
//   } else {
//     // La cookie 'userData' no fue encontrada en la solicitud
//     res.status(404).json({ message: 'No se encontraron datos de usuario en las cookies.' });
//   }
// });

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

module.exports = router;