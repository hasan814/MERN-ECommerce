import { useEffect, useState } from "react";
import { SummaryApi } from "../../common";
import { MdEdit } from "react-icons/md";

import Loader from "../modules/Loader";
import ChangeUserRole from "../modules/ChangeUserRole";

const AllUsersPage = () => {
  // ============= State ==============
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // To handle selected user for editing

  // ============= Function ==============
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before new fetch
      const response = await fetch(SummaryApi.all_users.url, {
        method: SummaryApi.all_users.method,
        credentials: "include",
      });
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setAllUsers(responseData.data);
      } else {
        throw new Error(responseData.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ============= Effect ==============
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ============= Handlers ==============
  const handleEditUser = (user) => {
    setSelectedUser(user); // Set the selected user to open modal
  };

  const handleCloseModal = () => {
    setSelectedUser(null); // Close the modal by clearing selected user
  };

  // ============= Rendering ==============
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">All Users</h1>
      {allUsers.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Sr.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Created Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name || "No Name"}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <button
                    className="bg-red-100 hover:bg-red-400 hover:text-white transition-all duration-300 p-2 rounded-full cursor-pointer"
                    onClick={() => handleEditUser(user)}
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {/* Render ChangeUserRole modal conditionally */}
      {selectedUser && (
        <ChangeUserRole
          name={selectedUser.name}
          email={selectedUser.email}
          role={selectedUser.role}
          userId={selectedUser._id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AllUsersPage;
