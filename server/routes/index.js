const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('./verifyToken');

const getUser = async function(req, res, next){
    //Check for token in header
    const token = req.header('authorization');
    if (token) {
        console.log('Found authorization header')
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findOne({ _id: verified });
            if(user){
                req.user = user.username;
            }
        } catch (err){
            console.log(err);
        } finally {
            next();
        }
    } else {
        console.log('Didn\'t find authorization header');
    }
    next();
}

router.get('/', getUser, (req, res, next)=>{
    console.log('home route');
    console.log(req.headers);
    let data = { user: req.user, message: "Home data"};
    // console.log(req.session);
    // if(req.user){
    //     const user = {
    //         username: req.user.username,
    //         firstname: req.user.firstname,
    //         lastname: req.user.lastname
    //     }
    //     data.user = user;
    //     return res.json(data);
    // }
    return res.json(data);
});

router.get('/dashboard', verifyToken, (req, res)=>{
    res.json({ package: 'Information object'});
})

router.get('/logout', (req, res, next)=>{
    console.log('Signing out');
    req.logout();
    res.json({ isLoggedIn: false, redirectTo: '/'});
})

module.exports = router;