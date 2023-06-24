import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("login", {
        email,
        password,
        withCredentials: true,
      });
      setUser(data);
      alert("login successful");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-8">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          action="POST"
          onSubmit={loginSubmit}
          className="mt-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Your@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Dont have an account yet?
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
