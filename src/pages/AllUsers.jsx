import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdModeEdit } from "react-icons/md";
import { SummaryApi } from "../utils/Api";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "./ChangeUserRole";

const AllUsers = () => {
  // ============ State ===============
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  // ============ Function ===============
  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData.success) setAllUsers(responseData.data);
    else if (responseData.error) toast.error(responseData.message);
  };

  // ============ Effect ===============
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // ============ Rendering ===============
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white ">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={uuidv4()}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <button
                  onClick={() => {
                    setUpdateUserDetails(user), setOpenUpdateRole(true);
                  }}
                  className="bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white"
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          userId={updateUserDetails._id}
          email={updateUserDetails.email}
          name={updateUserDetails.name}
          role={updateUserDetails.role}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
