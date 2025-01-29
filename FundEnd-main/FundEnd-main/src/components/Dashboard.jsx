import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [progressText, setProgressText] = useState(''); // Stores the progress input
  const [selectedCardId, setSelectedCardId] = useState(null); // Tracks which card is selected for adding progress

  useEffect(() => {
    // Fetch all cards from the backend
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/dashboard/Shiva/cards'); // Ensure this is your correct API path
        const data = await response.json();
        setCards(data); // Set the retrieved cards to the state
        console.log(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  // Function to handle the progress update
  const handleAddProgress = async (cardId) => {
    if (!progressText.trim()) return; // Prevent empty progress submissions

    try {
      const response = await fetch(`http://localhost:5000/cards/${cardId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: progressText }), // Send the progress text to backend
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setCards(cards.map(card => card._id === updatedCard._id ? updatedCard : card)); // Update card with new progress
        setProgressText(''); // Clear the input field
        setSelectedCardId(null); // Reset selected card
      } else {
        console.error('Failed to add progress');
      }
    } catch (error) {
      console.error('Error adding progress:', error);
    }
  };

  return (
    <section className="bg-gray-100 py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
        {cards.map((card) => (
          <div 
            key={card._id} 
            className="bg-white shadow-lg rounded-lg p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img 
              src={card.imageUrl} 
              alt={card.name} 
              className="w-full h-40 object-contain rounded-t-lg" 
            />
            <div className="p-5">
              <h5 className="text-xl font-semibold text-gray-900">{card.name}</h5>
              <p className="text-sm text-gray-700 mt-2">{card.description}</p>
              <p className="text-gray-500">Funds Received: ${card.fundsReceived} out of ${card.fundsRequired}</p>

              {/* Add Progress input form */}
              {selectedCardId === card._id ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={progressText}
                    onChange={(e) => setProgressText(e.target.value)}
                    placeholder="Enter progress details"
                    className="w-full p-2 border rounded"
                  />
                  <button 
                    onClick={() => handleAddProgress(card._id)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Add Progress
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCardId(card._id)} // Show the input field for the selected card
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  Add Progress
                </button>
              )}

              {/* Display Progress List */}
              {card.progress && card.progress.length > 0 && (
                <div className="mt-4">
                  <h6 className="font-semibold">Progress:</h6>
                  <ul className="list-disc pl-5">
                    {card.progress.map((progress, index) => (
                      <li key={index} className="mt-2">
                        <p>{progress.text}</p>
                        <p className="text-gray-500 text-sm">{new Date(progress.date).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button 
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                onClick={() => console.log(`View more of ${card.name}`)} // Add your view more logic here
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
