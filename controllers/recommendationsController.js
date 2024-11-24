const pool = require('../db');

exports.addRecommendationToCollection = async (req, res) => {
    const { collectionId } = req.params;
    const { recommendation_id } = req.body;

    try {
        await pool.query(
            'INSERT INTO collection_recommendations (collection_id, recommendation_id) VALUES ($1, $2)',
            [collectionId, recommendation_id]
        );
        res.status(201).json({ message: 'Recommendation added to collection' });
    } catch (error) {
        console.error('Error adding recommendation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.removeRecommendationFromCollection = async (req, res) => {
    const { collectionId, recommendationId } = req.params;

    try {
        await pool.query(
            'DELETE FROM collection_recommendations WHERE collection_id = $1 AND recommendation_id = $2',
            [collectionId, recommendationId]
        );
        res.status(200).json({ message: 'Recommendation removed from collection' });
    } catch (error) {
        console.error('Error removing recommendation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
