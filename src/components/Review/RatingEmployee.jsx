import React, { useState, useEffect } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';

const ReviewCard = ({ review }) => {
    // Format the date
    const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
      weekday: 'long', // Optional: to display the day of the week (e.g., "Monday")
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full mr-4">
          {review.avatar ? (
            <Image src={review.avatar} alt={review.name} className="w-full h-full rounded-full" />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-full">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
          <div>
            <h3 className="font-semibold text-lg">{review.username}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-sm text-gray-600">{formattedDate}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700">{review.reviewText}</p>
      </div>
    );
};
  

const RatingEmployee = ({ employeeId }) => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  console.log(reviews); // Logs the full reviews array
  console.log(filteredReviews); // Logs the filtered reviews array

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/auth/reviews?employeeId=${employeeId}`);
        setReviews(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [employeeId]);

  useEffect(() => {
    const filtered = reviews.filter(review =>
      (ratingFilter === 0 || review.rating === ratingFilter) &&
      (review.reviewText && review.reviewText.toLowerCase().includes(searchTerm.toLowerCase())) // Adjusted to reviewText
    );
    setFilteredReviews(filtered);
  }, [ratingFilter, searchTerm, reviews]);

  useEffect(() => {
    console.log(filteredReviews); // Log filteredReviews whenever it changes
  }, [filteredReviews]); // This hook will run when filteredReviews is updated

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <label htmlFor="rating-filter" className="mr-2 font-semibold">Filter by rating:</label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>All ratings</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} stars</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((review, index) => (
          <ReviewCard key={review?.id || index} review={review} />
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No reviews found matching your criteria.</p>
      )}
    </div>
  );
};

export default RatingEmployee;
