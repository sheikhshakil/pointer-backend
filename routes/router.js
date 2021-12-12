const router = require('express').Router()
const { registerApi } = require('../apis/auth/registerApi');

//validators
const regValidator = require('../validators/regValidator');


router.post('/register', regValidator, registerApi)


module.exports = router;