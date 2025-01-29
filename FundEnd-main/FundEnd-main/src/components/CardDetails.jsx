import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/cards/getcard/${id}`);
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/cards/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Card deleted successfully');
        navigate('/');
      } else {
        alert('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('An error occurred while deleting the card');
    }
  };

  return (
    <section className="bg-gray-100 py-8 px-4 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg shadow-blue-500 rounded-lg max-w-6xl w-full p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Left Column: Card Details Section */}
        <div className="col-span-2">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-64 object-contain rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{card.name}</h2>

          <div className="border-b border-gray-300 py-2">
            <p className="text-gray-600">{card.description}</p>
          </div>

          <div className="border-b border-gray-300 py-2">
            <p className="text-gray-500">Location: {card.place}</p>
          </div>

          <div className="border-b border-gray-300 py-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fund Goal</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="h-2.5 rounded-full bg-green-500"
                style={{ width: `${(card.fundsReceived / card.fundsRequired) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {((card.fundsReceived / card.fundsRequired) * 100).toFixed(2)}% of the goal achieved.
            </p>
          </div>

          <div className="border-b border-gray-300 py-2">
            <p className="text-gray-500">Created by: {card.createdBy}</p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={() => navigate(`/payment/${card._id}`)}
            >
                Invest
            </button>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => navigate(`/documents/${card._id}`)}
            >
                View Documents
            </button>
            </div>
        </div>

        {/* Right Column: Donors List and Progress Updates */}
        <div className="space-y-6">
          {/* Donors List */}
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Donors</h3>
            {card.donors && card.donors.length > 0 ? (
              <ul className="space-y-3">
                {card.donors.map((donor) => (
                  <li key={donor._id} className="bg-white p-3 rounded-lg shadow-sm text-gray-700">
                    <p className="font-medium text-blue-700">{donor.name}</p>
                    <p className="text-gray-500">Donated: ${donor.amountDonated}</p>
                    <p className="text-gray-400 text-sm">
                      Date: {new Date(donor.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No donors yet.</p>
            )}
          </div>

          {/* Progress Updates */}
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Updates</h3>
            <ul>
              {card.progress && card.progress.length > 0 ? (
                card.progress.map((progress, index) => (
                  <li key={index} className="border-b border-gray-200 py-2">
                    <p className="text-gray-700">{progress.text}</p>
                    <p className="text-sm text-gray-500">{new Date(progress.date).toLocaleDateString()}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No progress updates yet.</p>
              )}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CardDetails;
