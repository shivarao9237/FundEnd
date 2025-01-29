// Donate.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';

const Donate = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/cards/getcards');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <section className="bg-gray-100 py-8 px-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Donate to a Cause</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card._id} cardData={card} />
        ))}
      </div>
    </section>
  );
};

export default Donate;
