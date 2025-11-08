import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Veg", image: "" });
  const [editItemId, setEditItemId] = useState(null); // <-- for edit mode
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const { data } = await api.get("/menu");
      setMenuItems(data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to load menu");
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await api.delete(`/menu/${id}`);
      fetchMenu();
      setMsg("Item deleted");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to delete item");
    }
  };

  const handleAddItem = async () => {
    try {
      await api.post("/menu", newItem);
      fetchMenu();
      setNewItem({ name: "", price: "", category: "Veg", image: "" });
      setMsg("Item added");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to add item");
    }
  };

  const handleEditItem = (item) => {
    setEditItemId(item._id);
    setNewItem({ name: item.name, price: item.price, category: item.category || "Veg", image: item.image || "" });
  };

  const handleUpdateItem = async () => {
    try {
      await api.put(`/menu/${editItemId}`, newItem);
      fetchMenu();
      setNewItem({ name: "", price: "", category: "Veg", image: "" });
      setEditItemId(null);
      setMsg("Item updated");
    } catch (error) {
      setMsg(error?.response?.data?.message || "Failed to update item");
    }
  };

  return (
    <div>
      <div className="container" style={{ marginTop: 12, marginBottom: 12 }}>
        <Link className="btn btn-secondary" to="/admin/rooms">Go to Manage Rooms</Link>
      </div>
      <h2>Manage Menu</h2>
      {msg && <p>{msg}</p>}

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
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <input
          type="text"
          placeholder="Image path (e.g., /images/dish1.jpg)"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
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
            {item.name} - ₹{item.price} - {item.category || ""} - {item.image || ""}
            <button onClick={() => handleEditItem(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMenu;
