import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchMenu();
    }
  };

  // Update item
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/menu/${editItem._id}`,
        editItem
      );
      setEditItem(null);
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Menu Items</h2>
      {editItem ? (
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            className="form-control mb-2"
            type="text"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="number"
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, price: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            value={editItem.category}
            onChange={(e) =>
              setEditItem({ ...editItem, category: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="text"
            value={editItem.image}
            onChange={(e) =>
              setEditItem({ ...editItem, image: e.target.value })
            }
          />
          <button className="btn btn-success" type="submit">Update</button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setEditItem(null)}
          >
            Cancel
          </button>
        </form>
      ) : null}

      <ul className="list-group">
        {menu.map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.name} - ₹{item.price}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => setEditItem(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageMenu;
