import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const searchBreweries = (params) => api.get('/api/breweries', { params });
export const getBreweryDetails = (id) => api.get(`/api/breweries/${id}`);
export const submitReview = (breweryId, reviewData) => api.post(`/api/reviews`, { breweryId, ...reviewData });


