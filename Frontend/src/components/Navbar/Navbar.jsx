import React, { useState, useContext, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";

function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isUserLoggedIn = localStorage.getItem("token") !== "null";
  const { setUser } = useContext(UserDataContext);
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

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_SERVER_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if(response.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        window.location.reload();
      }
    })
    .catch(error => console.error(error));
  }

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
        <div className="flex items-center gap-6">
          <button onClick={handleLogout} className="border-red-400 text-sm border-[1px] cursor-pointer px-5 py-2 rounded-md hover:bg-red-500 hover:text-white duration-300 ease-in-out">
            Logout
          </button>
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
