import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isAuthenticated");
        if (isLoggedIn === "true") {
            setIsAuthenticated(true);
            navigate("/"); 
        }
    }, [setIsAuthenticated, navigate]);

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/login", 
                { username, password }, 
                { headers: { "Content-Type": "application/json" } } 
            );
            if (res.data.success) {
                localStorage.setItem("isAuthenticated", "true");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };
    

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6">
            <div className="bg-white p-4 flex-1 flex justify-center">
                <img src={img1} alt="Login Visual" className="w-[500px] h-[500px] object-cover" />
            </div>

            <div className="bg-white rounded-lg shadow-2xl p-8 w-[400px] h-[450px] mt-6 md:mt-0 md:ml-6 flex-1 flex justify-end">
                <div className="w-full max-w-md flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
