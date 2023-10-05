const express = require('express');
const passport = require('./config/passport-config')
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const cors = require('cors')
const connectDatabase = require("./db/Database.js");


if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}


const app = express();
const port = process.env.PORT || 3001;

// Configura la sesión

app.use(session({ secret: process.env.STEAM_API_KEY, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors({
  origin: "https://casejolt.vercel.app",
  credentials: true,
}));

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://casejolt.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/assets/data/getPrice', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://casejolt.vercel.app');
  res.header('Access-Control-Allow-Methods',  'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const authRoutes = require('./routes/passport-routes');
const csgoGameAssets = require('./routes/csgoDb-routes');
const User = require('./routes/userController');
app.use('/assets', csgoGameAssets);
app.use('/user', User);
app.use('/', authRoutes);
app.use("/test", (req, res) => {
  res.send("hello world!");
})


connectDatabase();

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});