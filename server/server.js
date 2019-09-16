const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const requestIp = require('request-ip');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
const app = express();

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth')(passport);

app.use(morgan('dev'));
app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    console.log(`Request from client ip: ${clientIp}`);
    next();
});

const uri = process.env.ATLAS_URI;

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
app.use(passport.session());

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
