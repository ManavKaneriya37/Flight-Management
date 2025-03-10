import React, { useState, useContext, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

function FlightSearchNavbar() {
  
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isUserLoggedIn = localStorage.getItem("token") !== "null";
  const { user, token } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));

  const profilePic =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <header className="bg-white px-[30px] md:px-[30px] shadow-sm">
      <nav
        className={`flex justify-between items-center w-full max-w-[1800px] mx-auto py-4 z-[10] transition-all duration-1000 ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
      >
        
        <Link to={"/"}>
          <div className="font-bold text-3xl">EliteWings</div>
        </Link>

        
        <div className="flex-1 ml-[15vw] mx-6 hidden md:flex">
          <div className="flex gap-3 items-center w-[42vw] max-w-[450px]">
            <div className="flex flex-col w-[10vw] flex-1">
              <input
                name="from"
                type="text"
                placeholder="From"
                className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex w-[10vw] flex-col flex-1">
              <input
                name="to"
                type="text"
                placeholder="To"
                className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex w-[12vw] flex-col flex-1">
              <input
                name="departDate"
                type="date"
                className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              className="bg-blue-500 w-[10vw] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/search")}
            >
              Search
            </button>
          </div>
        </div>

        
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

      
      <div className="md:hidden mt-4">
        <div className="flex flex-col gap-4">
          <input
            name="from"
            type="text"
            placeholder="From"
            className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
          />
          <input
            name="to"
            type="text"
            placeholder="To"
            className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
          />
          <input
            name="departDate"
            type="date"
            className="outline-none text-lg p-2 border border-gray-300 rounded-lg"
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate("/search")}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default FlightSearchNavbar;