import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Investments = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch all cards from the backend
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/investments/donor/Shiva'); // Ensure this is your correct API path
        const data = await response.json();
        setCards(data); // Set the retrieved cards to the state
        console.log(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <section className="bg-gray-100 py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Investments Made</h1>
      <div className="grid grid-cols-3 sm:grid-cols-* md:grid-cols-* lg:grid-cols-* gap-11">
      {cards.map((card) => (
          <Card key={card._id} cardData={card} />
        ))}
      </div>
    </section>
  );
};

export default Investments;
