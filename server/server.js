const express = require('express');
const morgan = require('morgan');
const requestIp = require('request-ip');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
require('dotenv').config();

const strategy = new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    console.log('user not found');
                    return done(null, false, { message: "Incorrect username." });
                } else {
                    console.log(`User: ${user}`);
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' })
                } else {
                    return done(null, user);
                }
            }).catch(err => {
                return done(err);
            });
    }
);

const port = process.env.PORT || 5000;
const app = express();

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    console.log(`Request from client ip: ${clientIp}`);
    next();
});

const uri = process.env.ATLAS_URI;
//console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
app.use(session({
    store: new MongoStore({
        mongooseConnection: db
    }),
    secret: 'GFGA@7#hjcx',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600,
        httpOnly: true
    }
}));

app.use(passport.initialize());
app.use(passport.session);

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
