import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { SummaryApi } from "../utils/Api";
import { toast } from "react-toastify";

import loginIcons from "../assets/signin.gif";
import Context from "../context";

const Login = () => {
  // ========== Context ============
  const { fetchUserDetails } = useContext(Context);

  // ========== Navigate ============
  const navigate = useNavigate();

  // ========== State ============
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  // ========== Function ============
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success)
      toast.success(responseData.message), fetchUserDetails(), navigate("/");
    if (responseData.error) toast.error(responseData.message);
  };
  // ========== Rendering ============
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form className="pt-6 flex flex-col gap-3" onSubmit={submitHandler}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-1">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  placeholder="Email ..."
                  alt="login icons"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 flex items-center p-1">
                <input
                  type={showPassword ? "text" : "password"}
                  alt="login icons"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  placeholder="Password ..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block mt-2 w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forget Password ?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4"
            >
              Login
            </button>
          </form>
          <p className="my-5 flex items-center justify-center gap-1">
            Don&apos;t have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
