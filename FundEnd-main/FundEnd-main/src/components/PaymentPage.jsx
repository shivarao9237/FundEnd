import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams(); // Get the card ID from the URL
  const navigate = useNavigate();
  
  // State to track the form step, donor information, and messages
  const [step, setStep] = useState(1);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    amountDonated: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure both fields are filled
    if (!donorInfo.name || !donorInfo.amountDonated || donorInfo.amountDonated <= 0) {
      setErrorMessage('Please provide valid name and donation amount.');
      return;
    }

    try {
      // Send the donation details to the backend
      const response = await fetch(`http://localhost:5000/cards/${id}/donate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorInfo),
      });

      // Handle the response from the backend
      if (response.ok) {
        const updatedCard = await response.json();
        setSuccessMessage('Thank you for your donation!');
        setErrorMessage('');
        
        // Redirect to the card details page after 3 seconds
        setTimeout(() => navigate(`/card/${id}`), 3000);
      } else {
        // If the donation fails, show an error message
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to process donation.');
      }
    } catch (error) {
      // Catch any errors and show an error message
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Donate to the Cause</h2>

      {successMessage ? (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      ) : (
        <>
          {/* Error Message */}
          {errorMessage && <div className="text-red-600 font-semibold mb-4">{errorMessage}</div>}

          {/* Step 1: Name Input */}
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={donorInfo.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your name"
              />
              <button
                onClick={() => setStep(2)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                disabled={!donorInfo.name}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Donation Amount Input */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Donation Amount</label>
              <input
                type="number"
                name="amountDonated"
                value={donorInfo.amountDonated}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter donation amount"
              />
              <button
                onClick={handleSubmit}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                disabled={!donorInfo.amountDonated || donorInfo.amountDonated <= 0}
              >
                Donate
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaymentPage;
