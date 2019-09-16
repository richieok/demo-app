const router = require('express').Router();
const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const {matchedData} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(passport){
    router.post('/signup', (req, res, next)=>{
            console.log(req.body);
            next();
        },
        [
            body('username').escape(),
            body('password').escape(),
            body('lastname').escape(),
            body('firstname').escape()
        ], 
        function(req, res, next){
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                res.json({message: 'Errors not empty'});
            } else {
                const match = matchedData(req);
                User.find({ username: match.username})
                .then(result=>{
                    if(result.length){
                        console.log('User already exists');
                        res.redirect('/signup');
                    } else {
                        bcrypt.hash(match.password, saltRounds)
                        .then(hash=>{
                            User.create({
                                username: match.username,
                                password: hash,
                                firstname: match.firstname,
                                lastname: match.lastname
                            });
                            return res.redirect('/login');
                        });
                    }
                })
                .catch(error => { console.log(`Error msg: ${error.message}`) })
            }
    });

    router.post('/', (req, res, next)=>{
        console.log(req.body);
            next();
        }, [
        body('username').escape(),
        body('password').escape()
        ]
        , 
        (req, res, next)=>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const holder = errors.mapped();
                console.log(holder);
                return res.redirect('/');
            } else {
                next();
            }
        },
        passport.authenticate('local'),
        (req, res)=>{
            res.json({ message: 'Success' });
        }
        );
    return router;
}

// router.post('/signup', (req, res, next)=>{
//     console.log(req.body);
//     res.json({ redirectTo: '/' });
// });

// router.post('/', (req, res, next)=>{
//     console.log(req.body);
//     res.json({data: 'Hello'});
// } );

// module.exports = router;