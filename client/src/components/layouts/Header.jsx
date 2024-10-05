import { IoSearchSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { HiMiniUser } from "react-icons/hi2";

const Header = () => {
  return (
    <header className="h-16 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="">
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
          <div className="text-3xl cursor-pointer">
            <HiMiniUser />
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
            <button className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
