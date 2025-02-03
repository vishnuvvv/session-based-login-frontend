import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between Admin and User login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(""); // New error state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear previous error
    try {
      const endpoint = isAdmin ? "admin/login" : "user/login"; // Dynamic endpoint

      const { data } = await axios.post(
        `http://localhost:5000/${endpoint}`,
        { email, password },
        { withCredentials: true }
      );

      console.log(data);
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/userDetails/${data.id}`);
      }
    } catch (err) {
      setError("Login failed! Check credentials and try again.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isAdmin ? "Admin" : "User"} Login
        </h2>

        {/* Toggle Button */}
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="mb-4 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
        >
          Switch to {isAdmin ? "User" : "Admin"} Login
        </button>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
