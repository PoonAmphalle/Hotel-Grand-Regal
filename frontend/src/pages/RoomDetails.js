import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import './RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);

        const priceCandidate = data?.price ?? data?.pricePerNight;
        let priceNum =
          typeof priceCandidate === "number"
            ? priceCandidate
            : parseInt(String(priceCandidate ?? "").replace(/[^0-9]/g, ""), 10);

        const typeNorm = typeof data?.type === "string" ? data.type.trim() : data?.type;
        const hint = String(typeNorm || data?.name || "").toLowerCase();

        if (!Number.isFinite(priceNum)) {
          if (hint.includes("executive")) priceNum = 8000;
          else if (hint.includes("suite")) priceNum = 7000;
          else if (hint.includes("delux")) priceNum = 4500; // covers 'delux' and 'deluxe'
          else if (hint.includes("standard")) priceNum = 3000;
          else if (hint.includes("family")) priceNum = 5500;
          else if (hint.includes("single")) priceNum = 2500;
          else if (hint.includes("double")) priceNum = 3500;
          else priceNum = 4000;
        }

        setRoom({
          ...data,
          price: priceNum,
          type: typeNorm,
          description: data?.description,
          amenities: Array.isArray(data?.amenities) ? data.amenities : [],
          image: data?.image,
        });
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (!room) return <div className="alert alert-danger m-4">Room not found. Please try another room.</div>;

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const defaultDescription = `Experience luxury and comfort in our beautifully appointed ${room.type || ''} room. Featuring modern amenities and elegant decor, this room is designed to provide you with the perfect stay.`;
  const roomDescription = room.description || defaultDescription;
  const amenitiesList = room.amenities?.length > 0 
    ? room.amenities
    : ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Safe', 'Hair Dryer'];

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="room-image-container" onClick={() => handleImageClick(room.image || "/images/default-room.jpg")}>
            <img 
              src={room.image || "/images/default-room.jpg"} 
              alt={room.name} 
              className="img-fluid rounded shadow-sm room-main-image"
              style={{ cursor: 'zoom-in' }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="room-details-card p-4 shadow-sm rounded h-100">
            <h1 className="h2 mb-3">{room.name}</h1>
            {room.type && (
              <span className="badge bg-primary mb-3">{room.type}</span>
            )}
            
            <div className="mb-4">
              <h4 className="h5 text-muted">Description</h4>
              <p className="mb-0">{roomDescription}</p>
            </div>

            <div className="mb-4">
              <h4 className="h5 text-muted">Room Features</h4>
              <div className="row g-2">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-users me-2 text-primary"></i>
                    <span><strong>Capacity:</strong> {room.capacity || 2} persons</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-bed me-2 text-primary"></i>
                    <span><strong>Bed Type:</strong> {room.bedType || 'King/Queen'}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-ruler-combined me-2 text-primary"></i>
                    <span><strong>Size:</strong> {room.size || '30'} m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="h5 text-muted">Amenities</h4>
              <div className="row g-2">
                {amenitiesList.map((amenity, index) => (
                  <div className="col-6" key={index}>
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      <span>{amenity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-end mt-4 pt-3 border-top">
              <h3 className="text-primary mb-0">₹{room.price} <small className="text-muted">/ night</small></h3>
              <button className="btn btn-primary btn-lg mt-3">Book Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          <img 
            src={selectedImage} 
            alt="Full size room" 
            className="img-fluid"
            style={{ maxHeight: '80vh', width: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoomDetails;