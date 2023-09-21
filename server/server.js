const express = require('express');
const passport = require('./config/passport-config')
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const cors = require('cors')

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}


const app = express();
const port = process.env.PORT || 3001;

// Configura la sesión
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(session({ secret: '64882127F2A6712358146C6A1F144FCA', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
const authRoutes = require('./routes/passport-routes');
const csgoGameAssets = require('./routes/csgoDb-routes');
app.use('/assets', csgoGameAssets);
app.use('/', authRoutes);


// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});