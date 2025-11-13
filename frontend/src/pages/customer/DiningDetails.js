import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiningDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        // First, fetch all menu items
        const response = await axios.get('/api/menu');
        
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid menu data received');
        }
        
        // Find the specific dish by ID
        const foundDish = response.data.find(item => item._id === id);
        
        if (!foundDish) {
          throw new Error('Dish not found');
        }
        
        setDish(foundDish);
      } catch (err) {
        console.error('Error fetching dish details:', err);
        setError(err.message || 'Failed to load dish details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading dish details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="container my-5 text-center">
        <h3>Dish not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/dining')}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button 
        className="btn btn-outline-secondary mb-4" 
        onClick={() => navigate(-1)}
      >
        ← Back to Menu
      </button>
      
      <div className="row">
        <div className="col-lg-8">
          <img 
            src={dish.image || '/images/dish-placeholder.jpg'} 
            alt={dish.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.src = '/images/dish-placeholder.jpg';
            }}
          />
        </div>
        <div className="col-lg-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">{dish.name}</h2>
            <span 
              className="badge" 
              style={{ 
                backgroundColor: dish.category === 'Veg' ? '#28a745' : '#dc3545',
                color: 'white',
                padding: '0.5em 0.8em',
                fontSize: '1rem'
              }}
            >
              {dish.category === 'Veg' ? '🥗 Veg' : '🍗 Non-Veg'}
            </span>
          </div>
          
          <p className="text-muted mb-4">{dish.category} Cuisine</p>
          <h4 className="text-primary mb-4">₹{dish.price?.toLocaleString() || 'N/A'}</h4>
          
          <div className="mb-4">
            <h5>Description</h5>
            <p>{dish.description || 'A delicious dish prepared by our expert chefs with the finest ingredients.'}</p>
          </div>
          
          <div className="mb-4">
            <h5>Ingredients</h5>
            <p>{dish.ingredients || 'Fresh ingredients sourced locally to ensure the best taste and quality.'}</p>
          </div>
          
          <div className="mb-4">
            <h5>Dietary Information</h5>
            <ul className="list-unstyled">
              <li>✓ {dish.category === 'Veg' ? 'Vegetarian' : 'Non-Vegetarian'}</li>
              <li>✓ {dish.category === 'Veg' ? 'No Meat' : 'Contains Meat'}</li>
              <li>✓ May contain common allergens</li>
            </ul>
          </div>
          
          <button className="btn btn-primary w-100 py-3">
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiningDetails;
