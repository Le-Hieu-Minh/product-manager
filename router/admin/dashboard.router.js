const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/dasboard.controllerr')

router.get('/', controller.dashboard)

module.exports = router;