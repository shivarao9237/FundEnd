const express = require('express');
const router = express.Router();
const Card = require('../models/card');



// Route to get user overview based on donor's name and creator's name
router.get('/:userName/overview', async (req, res) => {
    const { userName } = req.params;  // Get the username from the URL parameters

    try {
        // Find all cards where the user is a donor
        const donatedCards = await Card.find({
            "donors.name": userName
        });

        // Find all cards created by the user
        const createdCards = await Card.find({
            "createdBy": userName
        });

        // Calculate total amount donated and details of cards donated to
        let totalAmountDonated = 0;
        let donatedCardDetails = [];

        donatedCards.forEach(card => {
            const donor = card.donors.find(donor => donor.name === userName);
            totalAmountDonated += donor.amountDonated;
            donatedCardDetails.push({
                cardId: card._id,
                cardName: card.name,
                amountDonated: donor.amountDonated,
                fundsReceived: card.fundsReceived,
                fundsRequired: card.fundsRequired
            });
        });

        // Prepare created card details
        let createdCardDetails = createdCards.map(card => ({
            cardId: card._id,
            cardName: card.name,
            description: card.description,
            fundsRequired: card.fundsRequired,
            fundsReceived: card.fundsReceived,
            place: card.place
        }));

        // Total number of startups donated to
        const totalStartupsDonatedTo = donatedCards.length;

        // Respond with the user overview data
        res.status(200).json({
            userName: userName,
            totalAmountDonated: totalAmountDonated,
            totalStartupsDonatedTo: totalStartupsDonatedTo,
            donatedCardDetails: donatedCardDetails,
            createdCardDetails: createdCardDetails
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
