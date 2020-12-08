const { check } = require('express-validator');


exports.signUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage("Name is required"),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password at least 6 character long")
];