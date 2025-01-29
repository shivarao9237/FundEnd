import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Track the current step
  const [cardInfo, setCardInfo] = useState({
    name: '',
    imageUrl: '',
    description: '',
    fundsRequired: '',
    place: '',
    createdBy: '',
    digitalSignature: '',
  });
  const [agreements, setAgreements] = useState({
    agreement1: false,
    agreement2: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes for card info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for agreement checkboxes
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  // Check if form can be submitted
  const isFormValid = agreements.agreement1 && agreements.agreement2 && cardInfo.digitalSignature.trim() !== '';

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (
      !cardInfo.name ||
      !cardInfo.imageUrl ||
      !cardInfo.description ||
      !cardInfo.fundsRequired ||
      !cardInfo.place ||
      !cardInfo.createdBy ||
      !isFormValid
    ) {
      setErrorMessage('Please fill in all fields and complete the agreement section.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/cards/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardInfo),
      });

      if (response.ok) {
        const newCard = await response.json();
        setSuccessMessage('Fundraiser created successfully!');
        setErrorMessage('');

        // Redirect to the newly created card's page
        setTimeout(() => navigate(`/card/${newCard._id}`), 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create card.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex max-w-screen-xl mx-auto p-6 bg-white rounded shadow-lg">
      {/* Left Section: Step Indicator */}
      <div className="w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Step {step}</h2>
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-lg font-semibold">Step {step} Description</p>
          <p>
            {step === 1 && "Fill in the basic details to create a business."}
            {step === 2 && "Provide an image URL and description for the business."}
            {step === 3 && "Enter the funds required and place for the business."}
            {step === 4 && "Review and agree to the terms before starting the fundraiser."}
          </p>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Business</h2>

        {/* Error Message */}
        {errorMessage && <div className="text-red-600 font-semibold mb-4">{errorMessage}</div>}

        {/* Success Message */}
        {successMessage && <div className="text-green-600 font-semibold mb-4">{successMessage}</div>}

        {/* Card Creation Form */}
        <form onSubmit={handleSubmit}>
          {/* Step 1 Form */}
          {step === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                name="name"
                value={cardInfo.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter business name"
              />
            </div>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={cardInfo.imageUrl}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={cardInfo.description}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter business description"
                />
              </div>
            </>
          )}

          {/* Step 3 Form */}
          {step === 3 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Funds Required</label>
                <input
                  type="number"
                  name="fundsRequired"
                  value={cardInfo.fundsRequired}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter funds required"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Place</label>
                <input
                  type="text"
                  name="place"
                  value={cardInfo.place}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter place"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  value={cardInfo.createdBy}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter creator's name"
                />
              </div>
            </>
          )}

          {/* Step 4: Agreement Section */}
          {step === 4 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Agreements</label>

                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    name="agreement1"
                    checked={agreements.agreement1}
                    onChange={handleAgreementChange}
                    className="mr-2"
                  />
                  <span>Your startup has been verified by the MCA.</span>
                </div>

                <div className="flex items-start mt-4">
                  <input
                    type="checkbox"
                    name="agreement2"
                    checked={agreements.agreement2}
                    onChange={handleAgreementChange}
                    className="mr-2"
                  />
                  <span>If updates and expense tracking are not provided, you agree to refund investments, and action may be taken.</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Digital Signature</label>
                <input
                  type="text"
                  name="digitalSignature"
                  value={cardInfo.digitalSignature}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter your digital signature"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Previous
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid}
                className={`py-2 px-4 rounded ${
                  isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Fundraiser
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Start;
