import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col min-w-96 items-center justify-center mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 ">
          <span className="text-blue-500">ChatApp</span>
          Login
        </h1>
        <form>
          <label className="label">
            <span className="text-base label-text">UserName</span>
          </label>
          <input type="text" className="input input-bordered w-full h-10" />
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input type="password" className="input input-bordered w-full h-10" />
          <a
            href="#"
            className="text-sm hover:undeline hover:text-blue-600 mt-2 inline-block">
            Don't have an account?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
