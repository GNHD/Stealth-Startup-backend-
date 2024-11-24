const express = require('express');
const router = express.Router();
const recommendationsController = require('../controllers/recommendationsController');

// Recommendation routes
router.post('/:collectionId', recommendationsController.addRecommendationToCollection);
router.delete('/:collectionId/:recommendationId', recommendationsController.removeRecommendationFromCollection);

module.exports = router;
