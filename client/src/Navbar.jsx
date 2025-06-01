import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-50 backdrop-blur-md py-4">
      <div className="w-full flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-pink-500 text-2xl font-bold tracking-widest">
          AuditX
        </div>

        {/* Navigation Links */}
        <div className="flex gap-10 items-center font-semibold text-lg">
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
