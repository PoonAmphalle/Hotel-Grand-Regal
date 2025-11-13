console.log("🔥 TEST: DishDetail.js is LIVE");

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import './DishDetail.css';

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        setLoading(true);
        setError('');
        // First try the single dish endpoint
        try {
          const response = await axios.get(`/api/menu/${id}`);
          setDish(response.data);
          return;
        } catch (singleErr) {
          console.log('Single dish endpoint failed, falling back to fetching all items');
        }
        
        // Fallback: Fetch all items and filter by ID
        const response = await axios.get('/api/menu');
        const foundDish = response.data.find(dish => dish._id === id);
        
        if (foundDish) {
          setDish(foundDish);
        } else {
          throw new Error('Dish not found');
        }
      } catch (err) {
        console.error('Error fetching dish:', err);
        const errorMessage = err.response?.data?.message || 'Failed to load dish details';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDishDetails();
    } else {
      setError('No dish ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2">Loading dish details...</p>
  </div>;

  if (error) return <div className="container py-5">
    <div className="alert alert-danger">
      <h4 className="alert-heading">Error</h4>
      <p>{error}</p>
      <button 
        className="btn btn-outline-secondary" 
        onClick={() => navigate('/dining')}
      >
        ← Back to Menu
      </button>
    </div>
  </div>;

  return (
    <div className="dish-detail-container">
      <button 
        onClick={() => navigate(-1)} 
        className="btn-back"
      >
        <i className="fas fa-arrow-left"></i>
        <span>Back to Menu</span>
      </button>
      
      <div className="dish-content-wrapper">
        <div className="dish-image-section">
          <div className="dish-image-wrapper">
            <img
              src={dish.image || 'https://via.placeholder.com/800x600?text=No+Image+Available'}
              alt={dish.name}
              className="dish-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
            />
          </div>
        </div>
        
        <div className="dish-details-section">
          <div className="dish-header">
            <h1>{dish.name}</h1>
            {dish.category && (
              <span className="dish-category">
                {dish.category}
              </span>
            )}
          </div>
          
          <p className="dish-description">
            {dish.description || 'No description available for this delicious dish.'}
          </p>
          
          <div className="dish-footer">
            <div className="price-tag">
              ₹{dish.price?.toLocaleString('en-IN') || 'N/A'}
            </div>
            
            <button 
              className="btn-add-to-cart"
              onClick={() => {
                // Add to cart functionality can be added here
                toast.success('Added to cart!');
              }}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
