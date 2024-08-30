import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://yourhr-backend-dsxg.onrender.com/api/v1/user/logout",
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      localStorage.removeItem("token"); // Remove the token from local storage
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      // Maintain authorization state if there's an error during logout
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo-title">
          <h4>YOURHR</h4>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST JOB
                </Link>
              </li>
              
            </>
          ) : (
            <></>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
