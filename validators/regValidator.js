const { body } = require("express-validator");

const regValidator = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name can't be empty!")
    .not()
    .isNumeric()
    .withMessage("Name can't be numbers!"),

  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Email must be valid!"),

  body("password")
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be minimum 6 to 15 characters without whitespaces."),
];

module.exports = regValidator;