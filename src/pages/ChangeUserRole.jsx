import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { ROLE } from "../utils/role";

const ChangeUserRole = ({ name, email, role, onClose }) => {
  // ============ State ============
  const [userRole, setUserRole] = useState(role);

  // ============ function ============
  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setUserRole(value);
  };

  const updateUserRole = async () => {};

  // ============ Rendering ============
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((item) => (
              <option key={uuidv4()} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
