import React, { useState, useContext, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

function Navbar() {
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
    setTimeout(() => setIsLoaded(true), 500); // Add slight delay for a smooth transition
  }, []);

  return (
    <header className="bg-white px-[30px] md:px-[30px]">
      <nav
        className={`flex justify-between items-center w-full max-w-[1800px] mx-auto mt-5 z-[10] transition-all duration-1000 ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
      >
        <Link to={"/"}>
          <div className="font-bold text-3xl">EliteWings</div>
        </Link>
        {/* <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            menuOpen ? "top-[8%]" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5 z-[10]`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link to={"/search"} className="hover:text-gray-500">
                Search Flights
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500">Search hotels</Link>
            </li>
            <li>
              <Link className="hover:text-gray-500">Contact us</Link>
            </li>
          </ul>
        </div> */}
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

export default Navbar;
