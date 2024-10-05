import { RiUser6Fill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // =============== State ===============
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  // =============== Change Function ===============
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // =============== Submit Function ===============
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
  };

  // =============== Rendering ===============
  return (
    <section id="login">
      <div className="mx-auto container my-44 flex items-center justify-center">
        <div className="bg-transparent shadow-lg border rounded-lg p-2 py-5 w-full max-w-md mx-auto neumorphic-container">
          <div className="my-3">
            <RiUser6Fill className="mx-auto" size={40} />
          </div>
          <form className="pt-5" onSubmit={submitHandler}>
            <div className="mb-5">
              <label className="block text-gray-700">Email:</label>
              <div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  placeholder="Email ..."
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 focus:border-red-500 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">Password:</label>
              <div className="relative">
                <input
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  type={showPassword ? "" : "password"}
                  placeholder="Password ..."
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 neumorphic-input rounded-lg focus:border-red-500"
                />
                <div
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600 py-2"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="w-full py-2 px-4 bg-red-400 font-semibold rounded-lg neumorphic-button text-gray-700">
              Login
            </button>
          </form>
          <p className="py-3">
            Don&apos;t Have an Account?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-500 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
