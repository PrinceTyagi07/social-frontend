import { motion } from "framer-motion";
import { FaHome, FaPlusSquare, FaUserCircle, FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);

  const menuItems = [
    { name: "Home", icon: <FaHome size={24} />, path: "/feed" },
    // { name: "Feed", icon: <FaThLarge size={24} />, path: "/feed" },
    { name: "Post", icon: <FaPlusSquare size={24} />, path: "/post" },
    { name: "Profile", icon: <FaUserCircle size={24} />, path:'/profile/:'}
  ];

  return (
    <nav className=" z-100 fixed bottom-0 w-full bg-white shadow-md p-3 flex justify-between items-center">
      <ul className="flex w-full justify-around">
        {menuItems.map((item, index) => (
          <li key={index} className="relative flex flex-col items-center">
            {hovered === index && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: -10 }} 
                exit={{ opacity: 0, y: 5 }} 
                className="absolute bottom-10 bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
              >
                {item.name}
              </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.2, color: "#F93827" }}
              className="text-gray-600 cursor-pointer"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={item.path} >{item.icon}</Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
