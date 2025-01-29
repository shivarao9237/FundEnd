const express = require('express');
const router = express.Router();
const Card = require('../models/card');


// Route to create a new card
router.post('/', async (req, res) => {
    try {
        const newCard = new Card({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            fundsRequired: req.body.fundsRequired,
            fundsReceived: req.body.fundsReceived || 0,
            place: req.body.place,
            createdBy: req.body.createdBy // Assume createdBy is provided as user name in the request
        });
        
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to delete a card by its ID
router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id); 
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
  
      res.json({ message: 'Card deleted successfully' });
    } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ message: error.message });
    }
  });

  // PUT route to update progress for a card
// In your routes (cards.js or similar):
router.put('/:id/progress', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);  // Find the card by ID

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });  // If card not found, return error
        }

        // Create a new progress object
        const newProgress = {
            text: req.body.text,  // Text for the progress update
            date: new Date()       // Date of progress update
        };

        // Push the new progress to the progress array
        card.progress.push(newProgress);

        await card.save();  // Save the updated card

        res.json(card);  // Return the updated card with progress
    } catch (error) {
        console.error('Error updating progress:', error);  // Log the error
        res.status(500).json({ message: error.message });  // Return internal server error if any
    }
});


  

router.get('/getcard/:id', async (req, res) => {
    try {
      const card = await Card.findById(req.params.id);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.json(card);
    } catch (error) {
      console.error('Error fetching card details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Route to donate to a specific card (startup)
router.put('/:id/donate', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Card not found' });

        console.log('Received donation details:', req.body);  // Log the request body
        const donationAmount = Number(req.body.amountDonated);
        
        // Add the new donor details
        const newDonor = {
            name: req.body.name,
            amountDonated: donationAmount,
        };

        // Update the funds received and add the donor to the array
        card.fundsReceived += donationAmount;
        card.donors.push(newDonor);

        console.log('Updated card details:', card);  // Log updated card details

        await card.save();  // Save the updated card
        res.json(card);  // Respond with the updated card data
    } catch (error) {
        console.error('Error in donation route:', error);  // Log detailed error
        res.status(500).json({ message: error.message });
    }
});


router.get('/:userId/cards', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the cards created by the given userId
        const userCards = await Card.find({ userId: userId });

        if (!userCards || userCards.length === 0) {
            return res.status(404).json({ message: "No cards found for this user" });
        }

        // Prepare the response with cards and their respective donors
        const cardInfo = userCards.map(card => ({
            cardId: card._id,
            cardName: card.name,
            image: card.imageUrl,
            description: card.description,
            fundsRequired: card.fundsRequired,
            fundsReceived: card.fundsReceived,
            donors: card.donors.map(donor => ({
                name: donor.name,
                amountDonated: donor.amountDonated
            }))
        }));

        return res.status(200).json({
            userId: userId,
            createdCards: cardInfo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

router.get('/getcards', async (req, res) => {
    try {
      // Fetch all cards from the database
      const cards = await Card.find({});
      // Send the cards as a JSON response
      res.status(200).json(cards);
    } catch (error) {
      // Handle errors and send a 500 status
      console.error('Error fetching cards:', error);
      res.status(500).json({ message: 'Error fetching cards', error });
    }
  });




module.exports = router;
