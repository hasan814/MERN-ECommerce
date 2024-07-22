import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  // ============ Selector ============
  const user = useSelector((state) => state?.user?.user);
  const profilePic = user?.profilePic;
  const name = user?.name;
  const role = user?.role;

  // ============ Rendering ============
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt={name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{name}</p>
          <p className="text-sm">{role}</p>
        </div>
        <div>
          <nav className="grid">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
