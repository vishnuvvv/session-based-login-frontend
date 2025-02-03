import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/icons8-delete-90.png";
import addUser from "../assets/AddUser.png";
import editIcon from "../assets/editIcon.svg";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete user");
      });
  };

  const deleteAllUsers = () => {
    axios
      .delete("http://localhost:5000/users") // need to make it's backend.
      .then(() => {
        alert("All users deleted");
        setUsers([]);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete all users");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          Admin Panel
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">User List</h3>
            <button
              onClick={() => navigate("/addUser")}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
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
                  className="py-4 px-6 bg-gray-50 rounded-md mb-4 hover:bg-blue-50 transition duration-300 flex justify-between items-center"
                >
                  <span className="text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition duration-200">
                    {user.name} - {user.email}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigate(`/userDetails/${user._id}`)}
                      className="flex items-center justify-center w-8 h-8 bg-yellow-200 text-white rounded-full hover:bg-yellow-600 transition duration-200"
                    >
                      <img src={editIcon} alt="Edit Icon" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex items-center justify-center w-8 h-8 bg-red-200 text-white rounded-full hover:bg-red-700 transition duration-200"
                    >
                      <img src={image} alt="Delete Icon" className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No users found</p>
            )}
          </ul>
        </div>

        {/* Delete All Users Button */}
        <div className="mt-6 text-center">
          <button
            onClick={deleteAllUsers}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Delete All Users
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
