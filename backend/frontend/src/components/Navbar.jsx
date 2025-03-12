import { Link } from "react-router-dom";

const Navbar = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-orange-600 p-4 flex justify-between items-center shadow-lg">
      
      <h1 className="text-white text-2xl font-bold">DK Pharmaceuticals Management</h1>

      <div className="space-x-6">
        <Link to="/" className="text-white hover:text-orange-200 transition duration-300">
          Medicine List
        </Link>
        <Link to="/add" className="text-white hover:text-orange-200 transition duration-300">
          Add Medicine
        </Link>
        <Link to="/view-by-tablet" className="text-white hover:text-orange-200 transition duration-300">
          View by Tablet
        </Link>
        <Link to="/suppliers" className="text-white hover:text-orange-200 transition duration-300">
          Suppliers
        </Link>
        <button
          onClick={handleLogout}
          className="text-white hover:text-orange-200 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;