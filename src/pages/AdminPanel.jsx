import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/icons8-delete-90.png";
import addUser from "../assets/AddUser.png";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        alert("Access denied");
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then(() => {
        alert("User deleted");
        setUsers(users.filter((user) => user._id !== id)); // Remove user from state
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete user");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Panel
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">User List</h3>
            <button
              onClick={() => navigate("/addUser")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <img src={addUser} alt="Add user Icon" className="w-5 h-5 mr-2" />
              Add User
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  className="py-3 px-4 bg-gray-50 rounded-md mb-3 hover:bg-blue-50 transition duration-200 flex justify-between items-center"
                >
                  <span
                    onClick={() => navigate(`/userDetails/${user._id}`)}
                    className="text-lg font-medium text-gray-700 cursor-pointer"
                  >
                    {user.name} - {user.email}
                  </span>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                  >
                    <img src={image} alt="Delete Icon" className="w-4 h-4" />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">No users found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
