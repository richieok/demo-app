const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const strategy = new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username})
        .then(user => {
            if (!user){
                console.log('user not found');
                return done(null, false, { message: "Incorrect username."});
            } else {
                console.log(`User: ${user}`);
            }
            if (user.password !== password){
                return done(null, false, { message: 'Incorrect password.'})
            } else {
                return done(null, user);
            }
        }).catch(err=>{
            return done(err);
        });
    }
);

module.exports = strategy;