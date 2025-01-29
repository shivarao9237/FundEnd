import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ cardData }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/card/${cardData._id}`);
  };

  return (
    <div className="bg-white shadow-lg shadow-blue-500/50 hover:shadow-2xl rounded-lg p-4 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={cardData.imageUrl}
          alt={cardData.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
          {cardData.category || 'Category'}
        </div>
      </div>
      <div className="p-5">
        <h5 className="text-xl font-semibold text-gray-900 hover:text-blue-500 transition-colors">
          {cardData.name}
        </h5>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{cardData.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500 text-sm font-medium">
            Funds: <span className="text-green-600 font-semibold">${cardData.fundsRequired}</span>
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
