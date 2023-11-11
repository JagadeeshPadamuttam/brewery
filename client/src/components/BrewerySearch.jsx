

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BrewerySearch = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchParams, setSearchParams] = useState({ city: '', name: '', type: '' });
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const searchBreweries = async () => {
    try {
      let url = 'https://api.openbrewerydb.org/breweries';
      if (searchParams.city) {
        url = `${url}?by_city=${searchParams.city}`;
      } else if (searchParams.name) {
        url = `${url}?by_name=${searchParams.name}`;
      } else if (searchParams.type) {
        url = `${url}?by_type=${searchParams.type}&per_page=3`;
      }

      const response = await axios.get(url);
      setBreweries(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error searching for breweries:', error);
    }
  };

  return (
    <div style={{ padding: '20px' ,backgroundColor:"white" }}>
      {!searched && (
        <div style={{ marginBottom: '20px'  ,backgroundColor:"white" }}>
          <label style={{ display: 'block',backgroundColor:"white" }}>
            City:
            <input
              type="text"
              name="city"
            backgroundColor="white"
className='search-input'
              value={searchParams.city}
              onChange={handleInputChange}
            />
          </label>
          <label style={{ display: 'block',backgroundColor:"white" }}>
            Name:
            <input
              type="text"
              name="name"
backgroundColor="white"
           className='search-input'
              value={searchParams.name}
              onChange={handleInputChange}
            />
          </label>
          <label style={{ display: 'block' ,backgroundColor:"white"}}>
            Type:
            <input
              type="text"
              name="type"
               backgroundColor="none"
className='search-input'
              value={searchParams.type}
              onChange={handleInputChange}
            />
          </label>
          <button
            style={{
              padding: '8px 12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={searchBreweries}
          >
            Search
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' ,backgroundColor:"white"}}>
        {breweries.map((brewery) => (
          <div
            key={brewery.id}
            style={{
              flex: '0 0 calc(50% - 20px)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              // backgroundColor: 'white',
              margin: '10px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            <Link to={`/breweries/${brewery.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ margin: '5px 0' }}>{brewery.name}</h3>
            </Link>
            <p style={{ margin: '5px 0' }}>Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
            <p style={{ margin: '5px 0' }}>Phone: {brewery.phone}</p>
            <Link to={`/breweries/${brewery.id}`} style={{ textDecoration: 'none', color: '#4CAF50' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrewerySearch;

