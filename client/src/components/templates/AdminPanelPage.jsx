import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiMiniUser } from "react-icons/hi2";
import { useEffect } from "react";

const AdminPanelPage = () => {
  // =========== Navigate ============
  const navigate = useNavigate();

  // =========== Redux ============
  const { user } = useSelector((state) => state.user);

  // =========== Effect ============
  useEffect(() => {
    if (user?.role !== "ADMIN") navigate("/");
  }, [user, navigate]);

  // =========== Rendering ============
  return (
    <div className="min-h-[calc(100vh-245px)] sm:flex hidden">
      <aside className="my-3 w-full max-w-60 shadow-lg min-h-full">
        <div className="h-32 flex justify-center items-center flex-col gap-2">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user ? (
              <img
                src={user?.profilePic}
                className="w-18 h-20 rounded-full"
                alt={user?.name || "User profile"}
              />
            ) : (
              <HiMiniUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <div className="shadow-lg border my-3 flex items-center justify-center flex-col py-3 gap-3 rounded-lg">
          <nav className="grid">
            <Link to={"all-users"} className="p-2 rounded-lg hover:bg-blue-600">
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="p-2 rounded-lg hover:bg-blue-600"
            >
              All-Products
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

export default AdminPanelPage;
