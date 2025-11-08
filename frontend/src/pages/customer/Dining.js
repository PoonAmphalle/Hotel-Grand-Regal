import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

function Dining() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  // normalize any backend/public shape into a displayable image URL
  const toImageUrl = (item) => {
    const val =
      item?.image ??
      item?.imageUrl ??
      item?.photo ??
      item?.url ??
      item?.path ??
      null;

    const fromString = (s) => {
      if (!s) return null;
      // Absolute URLs or data URIs
      if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:")) return s;
      // Public asset path (served by React from /public) — keep as-is
      if (s.startsWith("/")) return s;
      // Backend relative path (e.g., uploads/...) — prefix API origin
      return `http://localhost:5000/${s}`;
    };

    if (typeof val === "string") return fromString(val);
    if (val && typeof val === "object") {
      // Support shapes like { url, path } or { data, contentType }
      if (typeof val.url === "string") return fromString(val.url);
      if (typeof val.path === "string") return fromString(val.path);
      if (val.data && (val.contentType || val.mimeType)) {
        const type = val.contentType || val.mimeType || "image/jpeg";
        return `data:${type};base64,${val.data}`;
      }
    }
    // final fallback placeholder
    return "https://via.placeholder.com/600x400?text=Dish";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        const withImg = (res.data || []).map((d) => ({
          ...d,
          _imageSrc: toImageUrl(d),
        }));
        setMenu(withImg);
        setFilteredMenu(withImg);
      })
      .catch((err) => console.error("Error fetching menu:", err));
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
        String(item.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
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
            <Col md={4} key={dish._id || dish.id || dish.name} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={dish._imageSrc}
                  alt={dish.name || "Dish image"}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Dish";
                  }}
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