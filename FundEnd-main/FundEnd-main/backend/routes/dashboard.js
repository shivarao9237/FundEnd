const express = require('express');
const router = express.Router();
const Card = require('../models/card');



// Route to get all cards created by a specific user name
router.get('/:userName/cards', async (req, res) => {
    try {
        const userCards = await Card.find({ createdBy: req.params.userName });
        res.json(userCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
