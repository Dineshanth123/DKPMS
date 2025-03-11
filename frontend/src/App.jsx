import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import MedicineList from "./components/MedicineList";
import AddMedicine from "./components/AddMedicine";
import UpdateMedicine from "./components/UpdateMedicine";
import ViewByTablet from "./components/ViewByTablet";
import Suppliers from "./components/Suppliers";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <div className="p-4">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {isAuthenticated ? (
            <>
              <Route path="/" element={<MedicineList />} />
              <Route path="/add" element={<AddMedicine />} />
              <Route path="/update/:id" element={<UpdateMedicine />} />
              <Route path="/view-by-tablet" element={<ViewByTablet />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
