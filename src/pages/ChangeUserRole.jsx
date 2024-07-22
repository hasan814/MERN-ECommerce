import { v4 as uuidv4 } from "uuid";
import { ROLE } from "../utils/role";

const ChangeUserRole = () => {
  return (
    <div className="fixed w-full h-full z-10 flex justify-between items-center">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name</p>
        <p>Email</p>
        <select>
          {Object.values(ROLE).map((item) => (
            <option key={uuidv4()} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChangeUserRole;
