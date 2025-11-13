import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRoomById } from '../../services/api';
import './RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        console.log('Fetching room with ID:', id);
        const response = await getRoomById(id);
        console.log('Room data received:', response.data);
        
        if (!response.data) {
          throw new Error('Room not found. It may have been removed or the link is incorrect.');
        }
        
        console.log('Found room:', response.data);
        setRoom(response.data);
        setError('');
      } catch (err) {
        console.error('Error in fetchRoomDetails:', err);
        const errorMessage = err.message || 'Failed to load room details. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoomDetails();
  }, [id]);

  console.log('Current room state:', { room, loading, error });

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading room details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Room</h4>
          <p>{error}</p>
          <div className="d-flex gap-2 mt-3">
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/rooms')}
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">
          <h4 className="alert-heading">Room Not Found</h4>
          <p>The requested room could not be found. It may have been removed or the link is incorrect.</p>
          <button 
            className="btn btn-primary mt-2"
            onClick={() => navigate('/rooms')}
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="room-details-container">
      {/* Back Button */}
      <div className="mt-4">
        <button 
          className="btn btn-outline-secondary d-flex align-items-center gap-2 mb-4" 
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Rooms</span>
        </button>
      </div>
      
      {/* Room Image - Full Width */}
      <div className="room-image-container">
        <div className="room-image-wrapper">
          <img 
            src={room.image || 'https://via.placeholder.com/1200x600?text=Room+Image'}
            alt={room.name}
            className="room-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x600?text=Room+Image';
            }}
          />
        </div>
      </div>
      
      {/* Room Content */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Room Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1 className="h2 fw-bold mb-2">{room.name}</h1>
                <div className="d-flex align-items-center text-muted mb-3">
                  <i className="fas fa-star text-warning me-1"></i>
                  <span className="me-3">{room.rating ? `${room.rating.toFixed(1)} (24 Reviews)` : 'New Listing'}</span>
                  <i className="fas fa-map-marker-alt me-1"></i>
                  <span>Hotel Grand Regal</span>
                </div>
              </div>
              <div className="text-end">
                <div className="h4 text-primary fw-bold">₹{room.price?.toLocaleString() || 'N/A'}</div>
                <small className="text-muted">per night (excl. taxes & fees)</small>
              </div>
            </div>
            
            {/* Room Description */}
            <div className="room-features-section">
              <h3 className="h5 fw-bold mb-3">About This Room</h3>
              <p className="room-description">
                {room.description || 'Experience luxury and comfort with our premium room amenities, designed to make your stay unforgettable.'}
              </p>
            </div>
            
            {/* Room Features */}
            <div className="mb-5">
              <h3 className="h5 fw-bold mb-3">
                <i className="fas fa-list-ul text-primary me-2"></i>
                Room Features
              </h3>
              <div className="row g-3">
                {[
                  'Free High-Speed Wi-Fi',
                  'Air Conditioning with Climate Control',
                  '55" 4K Ultra HD Smart TV',
                  'Premium Mini Bar (charges apply)',
                  'In-room Digital Safe',
                  '24/7 Room Service',
                  'Nespresso Coffee Machine',
                  'Ergonomic Work Desk with USB Ports',
                  'Premium Bath Amenities',
                  'Iron & Ironing Board',
                  'Hair Dryer',
                  'Bathrobes & Slippers'
                ].map((feature, index) => (
                  <div key={index} className="col-12 col-md-6 d-flex">
                    <i className="fas fa-check-circle text-success mt-1 me-2"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-5">
              <h3 className="h5 fw-bold mb-4">
                <i className="fas fa-concierge-bell text-primary me-2"></i>
                Included Amenities
              </h3>
              <div className="row g-3">
                {[
                  { icon: 'coffee', text: 'Complimentary Breakfast' },
                  { icon: 'wifi', text: 'High-Speed Internet' },
                  { icon: 'swimming-pool', text: 'Infinity Pool' },
                  { icon: 'dumbbell', text: 'Fitness Center' },
                  { icon: 'spa', text: 'Spa Access' },
                  { icon: 'shuttle-van', text: 'Airport Transfer' },
                  { icon: 'parking', text: 'Valet Parking' },
                  { icon: 'utensils', text: 'Fine Dining' },
                  { icon: 'concierge-bell', text: '24/7 Concierge' },
                  { icon: 'umbrella-beach', text: 'Beach Access' },
                  { icon: 'snowflake', text: 'Air Conditioning' },
                  { icon: 'tv', text: 'Cable TV' },
                ].map((amenity, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3">
                    <div className="d-flex align-items-center p-3 border rounded h-100">
                      <div className="bg-light rounded-circle p-2 me-3">
                        <i className={`fas fa-${amenity.icon} text-primary`}></i>
                      </div>
                      <span className="small">{amenity.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Booking Action */}
            <div className="bg-light p-4 rounded-3 text-center mt-5">
              <h3 className="h4 mb-4">Ready to book your stay?</h3>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary btn-lg px-5">
                  <i className="fas fa-calendar-check me-2"></i>
                  Book Now
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="far fa-calendar-alt me-2"></i>
                  Check Availability
                </button>
              </div>
              <p className="mt-4 text-muted small mb-0">
                Need help? Contact our reservations team at{' '}
                <a href="tel:+1234567890" className="text-decoration-none">+1 (234) 567-890</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
