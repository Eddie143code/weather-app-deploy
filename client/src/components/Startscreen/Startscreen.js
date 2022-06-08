import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import Startscreenimage from "../../icons/Startscreenimage.svg";
import "../../index.css";

const Startscreen = ({ onClick, user, logout }) => {
  const startimage = Startscreenimage;

  const navigate = useNavigate();

  useEffect(() => {
    const acc = localStorage.getItem("account");
    if (!acc) {
      navigate("/Login");
    }
  }, [user]);

  return (
    <section
      className="flex-wrap items-center justify-center 
      m-auto bg-violet-200 border-0 rounded-2xl h-135 w-75 "
    >
      <div className="flex justify-end">
        <button className="flex button-33 h-8 top-2" onClick={logout}>
          Sign out
        </button>
      </div>
      <div className="flex items-center justify-center m-auto p-6">
        <img src={startimage} width="220" height="220" alt="img" />
      </div>
      <div className="flex-wrap bg-white rounded-lg mt-8 mx-3">
        <div className="flex items-center justify-center p-6">
          <span className="flex m-auto px-4">
            Find out the weather in any capital city
          </span>
        </div>
        <div className="flex m-auto p-6 items-center justify-center">
          <button className="button-17" onClick={onClick}>
            Get Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default Startscreen;
