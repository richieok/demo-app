const router = require('express').Router();
const passport = require('../passport');

router.post('/signup', (req, res, next)=>{
    console.log('Sign up');
    //console.log(req.body);
    res.json({ redirectTo: '/' });
});

router.post('/', passport.authenticate('local') );

module.exports = router;