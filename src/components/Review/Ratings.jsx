'use client'

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Ratings = ({ employeeId }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [username, setUsername] = useState('');
    const [hover, setHover] = useState(null);    

  const handleRating = (index) => {
    setRating(index);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current date
    const currentDate = new Date().toISOString(); // This gives a string in ISO 8601 format (e.g., "2025-01-11T12:34:56.789Z")
    console.log(currentDate)
    const reviewData = {
      username,
      review,
      rating,
      employeeId,
      date: currentDate, // Add current date to the data being sent to the backend
    };

    try {
      const response = await axios.post('/api/auth/reviews', reviewData);
      toast(response.data.message); // Corrected typo from 'messag' to 'message'
    } catch (error) {
      console.error(error);
      alert('Failed to submit the review');
    }
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto my-8">
          <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Rate and Review</h2>

      {/* Star Rating Section */}
      <div className="flex justify-center mb-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`text-4xl cursor-pointer transition-colors duration-300 ${index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Username Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={handleUsernameChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
        />
      </div>

      {/* Review Section */}
        <textarea
          placeholder="Write your review here..."
          rows={5}
          value={review}
          onChange={handleReviewChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Ratings;
