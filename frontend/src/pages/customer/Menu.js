import { useState, useEffect } from "react";
import axios from "axios";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    fetchMenu();
  }, [token]);

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
