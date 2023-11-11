import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = ({ onAddReview }) => {
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddReview = async (e) => {
    e.preventDefault();
   alert('review submitted');
   navigate("/search")

    // Validation logic can be added here if needed
    if (!rating || !description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Send the new review data to the server
      const response = await axios.post('http://localhost:8080/reviews', { rating, description });

      // Pass the new review data to the parent component
      onAddReview(response.data);

      // Reset form fields and error
      setRating('');
      setDescription('');
      setError(null);

      // Navigate to the search page
      navigate('/search');
    } catch (error) {
      console.error('Error adding review:', error);
      // setError('An error occurred while adding the review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleAddReview}>
      <h3>Add a Review</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;




