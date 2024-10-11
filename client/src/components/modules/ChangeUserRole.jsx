import { v4 as uuidv4 } from "uuid";
import { SummaryApi } from "../../common/index";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ROLE } from "../../common/role";

import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  fetchAllUsers,
}) => {
  // ============== State ==============
  const [userRole, setUserRole] = useState(role);

  // ============== Change Function ==============
  const changeUserHandler = (event) => {
    setUserRole(event.target.value);
  };

  // ============== Update Function ==============
  const updateUserRole = async () => {
    try {
      const response = await fetch(SummaryApi.update_user.url, {
        method: SummaryApi.update_user.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          role: userRole,
        }),
        credentials: "include",
      });

      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }
      toast.success(responseData.message);
      onClose();
      fetchAllUsers();
    } catch (error) {
      console.error("An error occurred:", error.message);
      toast.error("Failed to update user role.");
    }
  };

  // ============== Rendering ==============
  return (
    <div className="fixed inset-0 w-full h-full z-10 flex justify-center items-center bg-gray-50 bg-opacity-80">
      <div className="relative p-8 w-full max-w-sm bg-blue-200 shadow-neumorphism rounded-lg">
        {/* Close Icon */}
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => onClose()}
        >
          <IoClose className="text-2xl text-gray-600 hover:text-gray-800" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-4 text-center">
          Change User Role
        </h1>

        {/* User Info */}
        <div className="mb-4">
          <p className="text-sm font-medium">Name:</p>
          <p className="text-base">{name}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium">Email:</p>
          <p className="text-base">{email}</p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center justify-between my-4">
          <p className="text-sm font-medium">Role:</p>
          <select
            className="border rounded-lg p-2 bg-white"
            value={userRole}
            onChange={changeUserHandler}
          >
            {Object.values(ROLE).map((item) => (
              <option key={uuidv4()} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Change Role Button */}
        <button
          onClick={updateUserRole}
          className="w-full mt-6 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 rounded-full transition duration-300"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

// ============== Prop Types ==============
ChangeUserRole.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(Object.values(ROLE)).isRequired,
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
};

export default ChangeUserRole;
