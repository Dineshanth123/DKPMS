import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 

const Navbar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-orange-600 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          DK Pharmaceuticals Management
        </h1>

        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-orange-200 transition">
            Medicine List
          </Link>
          <Link to="/add" className="text-white hover:text-orange-200 transition">
            Add Medicine
          </Link>
          <Link to="/view-by-tablet" className="text-white hover:text-orange-200 transition">
            View by Tablet
          </Link>
          <Link to="/suppliers" className="text-white hover:text-orange-200 transition">
            Suppliers
          </Link>
          <button onClick={handleLogout} className="text-white hover:text-orange-200 transition">
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 bg-orange-700 p-4 rounded-lg">
          <Link to="/" className="text-white hover:text-orange-200" onClick={() => setIsOpen(false)}>
            Medicine List
          </Link>
          <Link to="/add" className="text-white hover:text-orange-200" onClick={() => setIsOpen(false)}>
            Add Medicine
          </Link>
          <Link to="/view-by-tablet" className="text-white hover:text-orange-200" onClick={() => setIsOpen(false)}>
            View by Tablet
          </Link>
          <Link to="/suppliers" className="text-white hover:text-orange-200" onClick={() => setIsOpen(false)}>
            Suppliers
          </Link>
          <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-white hover:text-orange-200">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
