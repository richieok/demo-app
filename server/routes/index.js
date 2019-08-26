const router = require('express').Router();

router.get('/', (req, res, next)=>{
    console.log('home route');
    res.end();
})

router.get('/logout', (req, res, next)=>{
    console.log('Signing out');
    res.end();
})

module.exports = router;