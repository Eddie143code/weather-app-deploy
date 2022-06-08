import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

const API_URL = "/api/auth/";

const Login = ({ user, setUser, failed, setFailed }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      const userData = { email: email, password: password };
      const response = await axios.post(API_URL + "login", userData);
      const user = response.data;
      setUser(user);
      if (response.data) {
        setFailed(false);
        navigate("/");
        localStorage.setItem("account", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      setUser("");
      localStorage.setItem("user", user);
      setFailed(true);
      return error;
    }
  };

  useEffect(() => {
    const acc = localStorage.getItem("account");
    if (acc) {
      navigate("/");
    }
  }, []);

  return (
    <section className="flex flex-wrap justify-center m-0 h-96 w-60 bg-slate-200">
      <header className="flex justify-center text-4xl w-60">Login</header>
      <form onSubmit={handleSubmit}>
        <input
          className="flex"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="flex"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="flex justify-center bg-sky-500 button-3"
          type="submit"
        >
          submit
        </button>
      </form>
      <div className="flex justify-center w-60 h-8">
        {failed && (
          <span className="flex font-bold text-red-600">
            Invalid credentials
          </span>
        )}
      </div>
      <div className="flex m-0 h-8 justify-center">
        <Link className="button-33" to="/Register">
          Register
        </Link>
      </div>
    </section>
  );
};

export default Login;
