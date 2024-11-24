const pool = require('../db');

exports.createCollection = async (req, res) => {
    const { user_id, name, description } = req.body;
    if (!user_id || !name) {
        return res.status(400).json({ message: 'User ID and name are required' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO collections (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
            [user_id, name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCollectionRecommendations = async (req, res) => {
    const { collectionId } = req.params;
    try {
        const result = await pool.query(
            `SELECT r.* FROM recommendations r
             INNER JOIN collection_recommendations cr ON r.id = cr.recommendation_id
             WHERE cr.collection_id = $1`,
            [collectionId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteCollection = async (req, res) => {
    const { collectionId } = req.params;
    try {
        await pool.query('DELETE FROM collections WHERE id = $1', [collectionId]);
        res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (error) {
        console.error('Error deleting collection:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
