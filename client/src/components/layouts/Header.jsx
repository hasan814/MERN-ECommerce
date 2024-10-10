import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { setUserDetails } from "../../store/userSlice";
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniUser } from "react-icons/hi2";
import { SummaryApi } from "../../common";
import { useState } from "react";

import toast from "react-hot-toast";

const Header = () => {
  // ============== State ===============
  const [menuDisplay, setMenuDisplay] = useState(false);

  // ============== Redux ===============
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // ============== Route ===============
  const navigate = useNavigate();

  // ============== Function ===============
  const logoutHandler = async () => {
    try {
      const response = await fetch(SummaryApi.signOut.url, {
        method: SummaryApi.signOut.method,
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        dispatch(setUserDetails(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============== Rendering ===============
  return (
    <header className="h-16 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            width="60"
            height="40"
            src="https://img.icons8.com/color/96/small-business.png"
            alt="small-business"
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="border px-2 rounded-l-md h-7"
            placeholder="Search Product Here ..."
          />
          <div className="bg-red-600 hover:bg-red-400 rounded-r-md w-10 h-7 flex items-center justify-center">
            <IoSearchSharp className="text-white" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="relative group flex justify-center"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            <div className="text-3xl cursor-pointer">
              {user ? (
                <img
                  src={user.profilePic}
                  className="w-9 h-10 rounded-full"
                  alt="User profile picture"
                />
              ) : (
                <HiMiniUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute transition-all duration-300 bg-blue-300 whitespace-nowrap bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  <Link to={"admin-panel"}>Admin Panel</Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 p-1 rounded-full absolute -top-2 -right-3 flex items-center justify-center">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {user ? (
              <button
                onClick={logoutHandler}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                LogOut
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
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
