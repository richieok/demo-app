const router = require('express').Router();

router.post('/signup', (req, res, next)=>{
    console.log('Sign up');
    //console.log(req.body);
    res.json({ redirectTo: '/' });
});

router.post('/', (req, res, next)=>{
    console.log('Sign in');
    res.json({ redirectTo: '/dashboard'});
});

module.exports = router;