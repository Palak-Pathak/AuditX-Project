import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/auth");
    setMenuOpen(false); // close menu on logout
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-50 backdrop-blur-md py-4">
      <div className="w-full flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-pink-500 text-2xl font-bold tracking-widest cursor-pointer">
          <Link to="/" onClick={() => setMenuOpen(false)}>AuditX</Link>
        </div>

        {/* Hamburger menu button - visible only on small screens */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-pink-400 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex gap-6 items-center font-semibold text-lg
            absolute md:static top-full left-0 w-full md:w-auto bg-black bg-opacity-80 md:bg-transparent
            md:py-0 py-4 md:px-0 px-6 transition-all duration-300 ease-in-out
            ${menuOpen ? "flex" : "hidden"}
          `}
          onClick={() => setMenuOpen(false)} // close menu on link click (mobile)
        >
          <Link
            to="/"
            className="text-pink-400 hover:text-pink-300 transition duration-300 hover:drop-shadow-[0_0_6px_#ec4899]"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-pink-400 hover:text-pink-300 transition duration-300 hover:drop-shadow-[0_0_6px_#ec4899]"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-pink-400 hover:text-pink-300 transition duration-300 hover:drop-shadow-[0_0_6px_#ec4899]"
          >
            About
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-pink-400 hover:text-pink-300 transition duration-300 hover:drop-shadow-[0_0_6px_#ec4899]"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="ml-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-300"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
