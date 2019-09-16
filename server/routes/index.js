const router = require('express').Router();

const isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        console.log('You are in');
        // console.log(req.user);
        next();
    } else {
        console.log('Not logged in');
        res.json({ message: 'Not logged in'});
    }
}

router.get('/', isLoggedIn, 
    (req, res, next)=>{
    console.log('home route');
    res.end();
})

router.get('/logout', (req, res, next)=>{
    console.log('Signing out');
    res.end();
})

module.exports = router;