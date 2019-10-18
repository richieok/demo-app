const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const requestIp = require('request-ip');
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const port = process.env.PORT || 5000;
const app = express();

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');

app.use(function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    console.log(`Request from client ip: ${clientIp}`);
    next();
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    //console.log(req.headers);
    if (req.headers.origin === "http://localhost:3000") {
        //console.log(req.headers);
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Headers', 'content-type, authorization');
        res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    }
    next();
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

//app.use(express.json());
app.use(bodyParser.json());


app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
