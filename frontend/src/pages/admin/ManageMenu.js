import { useState, useEffect } from "react";
import axios from "axios";

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [editItemId, setEditItemId] = useState(null); // <-- for edit mode
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const { data } = await axios.get("/api/menu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post("/api/menu", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenu();
      setNewItem({ name: "", price: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = (item) => {
    setEditItemId(item._id);
    setNewItem({ name: item.name, price: item.price });
  };

  const handleUpdateItem = async () => {
    try {
      await axios.put(`/api/menu/${editItemId}`, newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenu();
      setNewItem({ name: "", price: "" });
      setEditItemId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMenu();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Menu</h2>

      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        {editItemId ? (
          <button onClick={handleUpdateItem}>Update Item</button>
        ) : (
          <button onClick={handleAddItem}>Add Item</button>
        )}
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}{" "}
            <button onClick={() => handleEditItem(item)}>Edit</button>{" "}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenu;
