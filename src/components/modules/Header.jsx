import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

import Logo from "../elements/Logo";

const Header = () => {
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
        <div className="flex items-center gap-4">
          <div className="text-3xl cursor-pointer">
            <FaRegCircleUser />
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
            <Link
              to={"/login"}
              className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
