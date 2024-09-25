import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import AdminModal from "../components/AdminModal"; // Import the AdminModal component

const Navbar = () => {
  const { token, username, logout } = useAuth(); // Get token and username from context
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state for dropdown
  const [showModal, setShowModal] = useState(false); // State to show admin modal

  // Function to generate a unique background color
  const generateAvatarColor = (username) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#FF33F6']; // Add more colors as needed
    const index = username.charCodeAt(0) % colors.length; // Simple hash to choose color based on username
    return colors[index];
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login page after logout
  };

  const handleAdminAccess = () => {
    setShowModal(false); // Close the modal when OTP is validated
    // You can navigate to the admin page here if needed
    navigate("/admin");
  };

  return (
    <>
      <div className="sticky flex bg-dark items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        <img 
          onClick={() => navigate("/")} 
          className="w-44 cursor-pointer" 
          src="/src/assets/logo-no-background.png" 
          alt="navbar-logo" 
        />
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "py-1 border-b-2 border-primary text-primary" // Active class with underline
                : "py-1"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "py-1 border-b-2 border-primary text-primary" // Active class with underline
                : "py-1"
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "py-1 border-b-2 border-primary text-primary" // Active class with underline
                : "py-1"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "py-1 border-b-2 border-primary text-primary" // Active class with underline
                : "py-1"
            }
          >
            CONTACT
          </NavLink>
        </ul>

        <div className="flex items-center gap-4 relative">
          {token ? (
            <div 
              className="flex items-center gap-2"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div
                style={{
                  backgroundColor: generateAvatarColor(username),
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                {username.charAt(0).toUpperCase()}
              </div>
              {/* Caret symbol */}
              <span className="ml-1 cursor-pointer text-white" style={{ fontSize: '14px' }}>&#x5E;</span>
              
              {showDropdown && (
                <div className="absolute right-0 bg-white w-48 text-black shadow-lg rounded-lg mt-32 z-10">
                  <NavLink to="/my-profile" className="block px-4 py-2 hover:bg-gray-200">👤 My Profile</NavLink>
                  <NavLink to="/my-appointments" className="block px-4 py-2 hover:bg-gray-200">👩🏻‍🏭 My Appointments</NavLink>
                  <div 
                    onClick={handleLogout} 
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    👋🏻 Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create Account
            </button>
          )}

          {/* Admin Button */}
          {token && (
            <button
              onClick={() => setShowModal(true)} // Show the admin modal on click
              className="text-sm text-primary underline ml-4"
            >
              Admin
            </button>
          )}

          {/* Mobile Menu */}
          <div className={`${showMenu ? 'fixed w-1/2' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all bg-current`}>
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src="/src/assets/logo-no-background.png" alt="logo" />
              <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close-icon" />
            </div>
            <ul className="flex flex-col item-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink
                onClick={() => setShowMenu(false)}
                to='/'
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded inline-block text-white border-b-2 border-primary"
                    : "px-4 py-2 rounded inline-block text-white"
                }
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to='/doctors'
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded inline-block text-white border-b-2 border-primary"
                    : "px-4 py-2 rounded inline-block text-white"
                }
              >
                ALL DOCTORS
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to='/about'
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded inline-block text-white border-b-2 border-primary"
                    : "px-4 py-2 rounded inline-block text-white"
                }
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to='/contact'
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded inline-block text-white border-b-2 border-primary"
                    : "px-4 py-2 rounded inline-block text-white"
                }
              >
                CONTACT
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Admin Modal */}
      {showModal && (
        <AdminModal 
          closeModal={() => setShowModal(false)} // Close modal function
          handleAccess={handleAdminAccess} // Access function for admin
        />
      )}
    </>
  );
};

export default Navbar;
