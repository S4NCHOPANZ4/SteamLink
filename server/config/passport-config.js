const passport = require("passport");
const session = require('express-session');
const SteamStrategy = require("passport-steam").Strategy;
require("dotenv").config({
  path: "./config/.env",
});
passport.use(
  new SteamStrategy(
    {
      returnURL: "https://casejoltserver.vercel.app/auth/steam/return",
      realm: "https://casejoltserver.vercel.app/",
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      // Aquí puedes verificar la información del usuario y generar un token personalizado
      const user = {
        steamId: profile.id,
        displayName: profile.displayName,
        // Otras propiedades del usuario
      };
      return done(null, user);
    }
  )
);

module.exports = passport;
