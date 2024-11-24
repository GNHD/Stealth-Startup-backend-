const express = require('express');
const collectionsRoutes = require('./collections');
const recommendationsRoutes = require('./recommendations');

const router = express.Router();

router.use('/collections', collectionsRoutes);
router.use('/recommendations', recommendationsRoutes);

module.exports = router;
