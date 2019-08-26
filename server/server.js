const express = require('express');
const morgan = require('morgan');
const requestIp = require('request-ip');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

const authRoute = require('./routes/auth');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    console.log(`Request from client ip: ${clientIp}`);
    next();
});

app.use('/auth', authRoute);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
