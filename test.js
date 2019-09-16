const mongoose = require('mongoose');
const User = require('./server/models/user');

mongoose.connect('mongodb://127.0.0.1/demo-app', { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const newUser = {
    username: 'a_gerst@qubit.com.ng',
    password: '12345678',
    firstname: 'Amy',
    lastname: 'Gerst'
};

// User.deleteMany({ username: 'j.delaney@qubit.com.ng' })
// .then(result=>{
//     console.log('delete complete')
// })
// .catch(error=>{
//     console.log();
// })
// .finally(()=>{
//     process.exit();
// });

User.find({ username: 'a_gerst@qubit.com.ng'})
.then(result => { 
    if (result.length > 0){
        console.log(result);
        console.log('User already exits');
    } else {
        User.create(newUser).then((result)=>{
            console.log(`result: ${result}`);
        }).finally(()=>{
            process.exit();
        });
    } })
.catch(error=>{console.log(error)});

