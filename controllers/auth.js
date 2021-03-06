const User = require('../models/User');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signUp = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email })
        .exec((err, user) => {
            if (err || user) return res.status(400).json({ error: "Email is taken." });

            const username = shortId.generate();
            const profile = `${process.env.CLIENT_URL}/profile/${username}`;

            const newUser = new User({ name, email, password, profile, username });
            newUser.save((err, success) => {
                if (err) return res.status(400).json({ error: err });
                res.json({ msg: "User created successfully" })
            });
        });
}


exports.signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) return res.status(400).json({ error: "User with that email dose not exits. Please signUp" });
        // authenticate
        if (!user.authenticate(password)) return res.status(400).json({ error: "Email & password do not match" });
        // generate a new token
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { expiresIn: "1d" });

        let { _id, username, name, email, role } = user;
        res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
}


exports.signOut = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: "Successfully Log Out" });
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "user",
});



exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId })
        .exec((err, user) => {
            if (err || !user) return res.status(400).json({ error: "User not found" });
            req.profile = user;
            next();
        })
}

exports.adminMiddleware = (req, res, next) => {
    let adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });

};