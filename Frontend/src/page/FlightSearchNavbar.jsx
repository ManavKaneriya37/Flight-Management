import React, { useState, useContext, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FlightSearchNavbar() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isUserLoggedIn = localStorage.getItem("token") !== "null";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const profilePic =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <header className="bg-white px-[20px] md:px-[20px]">
      <nav
        className={`flex justify-between items-center w-full max-w-[1800px] mx-auto z-[10] transition-all duration-1000 ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
      >
        <Link to={"/"}>
          <div className="font-semibold text-3xl opacity-50 ">EliteWings</div>
        </Link>

        <div className="flex items-center gap-6">
          {isUserLoggedIn ? (
            <Link to={isAdmin ? "/admin" : "/profile"}>
              <img
                src={profilePic}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full"
              />
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]">
                Sign in
              </button>
            </Link>
          )}
          <RxHamburgerMenu
            onClick={toggleMenu}
            className="text-3xl cursor-pointer md:hidden"
          />
        </div>
      </nav>
    </header>
  );
}

export default FlightSearchNavbar;
