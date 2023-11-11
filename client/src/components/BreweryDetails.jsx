// BreweryDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const styles = {
  detailContainer: {
    height: '50vh',
    maxWidth: '130%',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '50px',
backgroundColor:"beige"
  },
  breweryDetail: {
    marginBottom: '20px',
  },
  reviewsSection: {
    marginBottom: '20px',
  },
  addReviewSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  textarea: {
    marginBottom: '10px',
    width: '100%',
  },
  submitButton: {
    minWidth: '80px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
};

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBreweryDetail = async () => {
      try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
        setBrewery(response.data);

        const reviewsResponse = await axios.get(`/api/reviews/${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching brewery details:', error);
      }
    };

    fetchBreweryDetail();
  }, [id]);

  const handleAddReview = async (reviewData) => {
    try {
      await axios.post(`/api/reviews/${id}`, reviewData);

      const reviewsResponse = await axios.get(`/api/reviews/${id}`);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div style={styles.detailContainer }>
      {brewery && (
        <div style={styles.breweryDetail}>
          <h2>{brewery.name}</h2>
          <p style={{ marginBottom: '20px' ,marginTop:"20px"}}>
            Address: {brewery.street}, {brewery.city}, {brewery.state}
          </p>
          {/* Display other brewery details */}
        </div>
      )}

      <div style={styles.reviewsSection}>
        <h3>Reviews</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reviews.map((review, index) => (
            <li key={index}>
              <p>Rating: {review.rating}</p>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>

        <div style={styles.addReviewSection}>
          <ReviewForm onAddReview={handleAddReview} />
        </div>
      </div>
    </div>
  );
}

export default BreweryDetail;





