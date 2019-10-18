let LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function (user, done) {
        console.log('Serialize')
        console.log(`User id: ${user._id}`);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        console.log('Deserialize')
        console.log(`--------- ID: ${id}`);
        User.findOne({ _id: id })
        .then(result=>{
            done(null, result);
        })
        .catch(error => { console.log(`Error msg: ${error.message}`)})
    });

    passport.use(new LocalStrategy(function(username, password, done){
        console.log('--------- Local Strategy');
        User.find({username: username})
        .then(result=>{
            if(!result.length){
                console.log('User not found');
                done(null, false, { message: 'User not found'});
            } else {
                console.log(`User: ${result[0].username}`);
                bcrypt.compare(password, result[0].password)
                .then(found=>{
                    if(found){
                        console.log('found: ', result[0]);
                        done(null, result[0]);
                    } else {
                        console.log('Password incorrect');
                        done(null, false, { message: 'Password incorrect'})
                    }
                }).catch(error => { console.log(`Error msg: ${error.message}`)})
            }
        })
        .catch(error=>{
            console.log(`Error msg: ${error.message}`);
            done(error);
        })
    }));
}