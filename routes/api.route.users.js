const express = require('express');
const router = express.Router();

const usersCont = require('../controllers/users.controller');

router.get('/:username', usersCont.getUser);

module.exports = router;