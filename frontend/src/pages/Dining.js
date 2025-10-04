import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

function Dining() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setMenu(res.data);
        setFilteredMenu(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // filter logic
  useEffect(() => {
    let filtered = [...menu];

    if (category) {
      filtered = filtered.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMenu(filtered);
  }, [category, search, menu]);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Dining Menu</h2>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Search Dish</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter dish name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Menu Cards */}
      <Row>
        {filteredMenu.length > 0 ? (
          filteredMenu.map((dish) => (
            <Col md={4} key={dish._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={dish.image}
                  alt={dish.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ₹{dish.price} <br />
                    <strong>Category:</strong> {dish.category || "N/A"} <br />
                    {dish.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No dishes found.</p>
        )}
      </Row>
    </Container>
  );
}

export default Dining;
