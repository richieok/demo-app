const passport = require('passport');
const LocalStrategy = require('./localstrategy');
const User = require('../models/user');

passport.serializeUser((user, done)=>{
    console.log(`***Serialize User called ${user}`);
    console.log('-----');
    done( null, user.id );
});

passport.deserializeUser((id, done)=>{
    console.log('DeserializeUser called');
    User.findOne({id: id})
    .then(user=>{
        console.log(`*** Deserialize user, ${user}:`)
        console.log('-----');
        done( null, user);
    });
})

passport.use(LocalStrategy);

module.exports = passport;