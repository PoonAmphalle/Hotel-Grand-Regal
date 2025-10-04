import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // filter logic
  useEffect(() => {
    let filtered = [...rooms];

    if (priceRange) {
      if (priceRange === "low") {
        filtered = filtered.filter((room) => room.pricePerNight < 3000);
      } else if (priceRange === "mid") {
        filtered = filtered.filter(
          (room) => room.pricePerNight >= 3000 && room.pricePerNight <= 6000
        );
      } else if (priceRange === "high") {
        filtered = filtered.filter((room) => room.pricePerNight > 6000);
      }
    }

    if (capacity) {
      filtered = filtered.filter(
        (room) => room.capacity.toString() === capacity
      );
    }

    setFilteredRooms(filtered);
  }, [priceRange, capacity, rooms]);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Our Rooms</h2>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Price</Form.Label>
            <Form.Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All</option>
              <option value="low">Below ₹3000</option>
              <option value="mid">₹3000 - ₹6000</option>
              <option value="high">Above ₹6000</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Capacity</Form.Label>
            <Form.Select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Room Cards */}
      <Row>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <Col md={4} key={room._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={room.image}
                  alt={room.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{room.pricePerNight}/night <br />
                    <strong>Capacity:</strong> {room.capacity} persons <br />
                    <strong>Amenities:</strong> {room.amenities}
                  </Card.Text>
                  <Card.Text>{room.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No rooms found with selected filters.</p>
        )}
      </Row>
    </Container>
  );
}

export default Rooms;
