const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/home.controllerr')

router.get('/', controller.index)

module.exports = router;