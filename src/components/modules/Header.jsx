import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { setUserDetails } from "../../store/userSlice";
import { FaShoppingCart } from "react-icons/fa";
import { SummaryApi } from "../../utils/Api";
import { GrSearch } from "react-icons/gr";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Logo from "../elements/Logo";

const Header = () => {
  // ============ State ===========
  const [menuDisplay, setMenuDisplay] = useState(false);

  // ============ Dispatch ===========
  const dispatch = useDispatch();

  // ============ Selector ===========
  const user = useSelector((state) => state?.user?.user);
  const ProfilePic = user?.profilePic;
  const name = user?.name;
  const id = user?._id;

  // ============ Function ===========
  const handleLogout = async () => {
    console.log("object");
    const response = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await response.json();
    if (data.success)
      toast.success(data.message), dispatch(setUserDetails(null));
    else if (data.error) toast.error(data.message);
  };

  // ============ Rendering ===========
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Product Here"
            className="w-full outline-none"
          />
          <div className="bg-red-600 text-lg min-w-[50px] h-8 text-white flex items-center justify-center rounded-r-full">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={ProfilePic}
                  alt={name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hover:bg-slate-100 hidden md:block p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {id ? (
              <button
                className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
