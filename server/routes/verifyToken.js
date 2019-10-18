const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function (req, res, next) {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({
        error: 'Access Denied',
        succes: false
    });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ _id: verified });
        if (user) {
            req.user = user.username;
        }
        next();
    } catch (err) {
        res.status(400).json({
            error: 'Invalid Token',
            succes: false
        });
    }
}