const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation } = require('../validation');
const saltRounds = 10;

router.post('/signup',
    async (req, res, next) => {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message })
        //check if user already exists
        const emailExists = await User.findOne({ username: req.body.username });
        if (emailExists) return res.status(400).json({ error: 'Email already exists' });
        //hash password
        const hash = await bcrypt.hash(req.body.password, saltRounds);

        //Create a new user
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hash
        })
        try {
            const savedUser = await user.save();
            res.json({ user: savedUser._id });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    });

router.post('/signin',
    async (req, res, next) => {
        console.log(req.body);
        const { error } = loginValidation(req.body);
        if (error) {
            console.log('Found error')
            return res.status(400).json({ error: error.details[0].message });
        }
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ error: 'Email or password is wrong' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Email or password is wrong' });
        //Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 600 });
        console.log("Token created");
        res.header('authorization', token).json({
            token: token,
            redirect: '/dashboard',
            success: true,
            username: user.username
        });
    }
);

module.exports = router;