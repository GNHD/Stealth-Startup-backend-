const express = require('express');
const router = express.Router();
const collectionsController = require('../controllers/collectionsController');

// Collection routes
router.post('/', collectionsController.createCollection);
router.get('/:collectionId/recommendations', collectionsController.getCollectionRecommendations);
router.delete('/:collectionId', collectionsController.deleteCollection);

module.exports = router;
