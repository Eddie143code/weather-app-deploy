import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinningCircles } from "react-loading-icons";
const API_URL = "/api/auth/";

const Registration = ({
  user,
  setUser,
  failed,
  setFailed,
  loading,
  setLoading,
}) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { name, email, password } = form;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }

    try {
      setLoading(true);
      setUser({ name: name, email: email, password: password });
      const userData = { name: name, email: email, password: password };

      const response = await axios.post(API_URL + "register", userData);
      setLoading(false);
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
      setLoading(false);
      return error;
    }
  };

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <SpinningCircles />;
  }

  return (
    <section className="flex flex-wrap justify-center m-0 h-96 w-60 bg-slate-200">
      <header className="flex justify-center text-4xl w-60">Register</header>
      <form onSubmit={handleSubmit}>
        <input
          className="flex"
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          className="flex"
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          className="flex"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
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
          Login
        </Link>
      </div>
    </section>
  );
};

export default Registration;
