const passport = require("passport");
const session = require('express-session');
const SteamStrategy = require("passport-steam").Strategy;

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3001/auth/steam/return",
      realm: "http://localhost:3001/",
      apiKey: "64882127F2A6712358146C6A1F144FCA",
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
