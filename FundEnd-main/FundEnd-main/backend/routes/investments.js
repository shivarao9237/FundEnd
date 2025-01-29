const express = require('express');
const router = express.Router();
const Card = require('../models/card');  // Assuming Card model is already created



// Route to get all investments for a specific donor (by donor's username)
router.get('/donor/:username', async (req, res) => {
    const username = req.params.username;

    try {
        // Find all cards where the donor's username matches
        const cards = await Card.find({
            "donors.name": username  // Search within the donors array for matching donor name
        });

        // Check if any cards are found
        if (cards.length === 0) {
            return res.status(404).json({ message: `No investments found for donor: ${username}` });
        }
        res.json(cards);
        // Prepare the investments data for response
        // const investments = cards.map(card => {
        //     return {
        //         cardId: card._id,
        //         name: card.name,
        //         description: card.description,
        //         fundsRequired: card.fundsRequired,
        //         fundsReceived: card.fundsReceived,
        //         imageUrl: card.imageUrl,
        //         donors: card.donors.filter(donor => donor.name === username)  // Only include donations from the specific donor
        //     };
        // });

        // Respond with the filtered investment data
        //res.status(200).json(investments);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch investments.' });
    }
});

module.exports = router;
