const express = require('express');
const passport = require('./config/passport-config')
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const cors = require('cors')


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



passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
const authRoutes = require('./routes/passport-routes');
app.use('/', authRoutes);


// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});