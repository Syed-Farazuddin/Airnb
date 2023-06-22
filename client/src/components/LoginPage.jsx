import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // const { email, setEmail } = useState("");
  // const { password, setPassword } = useState("");

  return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="mt-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your@gmail.com"
            value={email}
            onChange={(e) => e.target.value}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => e.target.value}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black ml-2" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
