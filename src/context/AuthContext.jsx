import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from cookies
  const [token, setToken] = useState(() => Cookies.get("token") || null); // Use null instead of false
  const [username, setUsername] = useState(() => Cookies.get("username") || "");
  const [email, setEmail] = useState(() => Cookies.get("email") || "");
  const [doctors] = useState([]); // Placeholder for doctors array (populate as needed)
  const [appointments, setAppointments] = useState([]);

  // Function to book an appointment
  const bookAppointment = (appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  // Function to check if the token has expired
  const isTokenExpired = () => {
    const expiration = Cookies.get("tokenExpiration");
    return !expiration || Date.now() > parseInt(expiration);
  };

  // Function to log in the user
  const login = (user) => {
    const expirationTime = Date.now() + user.expiresIn * 1000; // Calculate expiration time
    setUsername(user.username);
    setEmail(user.email);
    setToken(user.token);

    // Store values in cookies
    Cookies.set("token", user.token, { expires: user.expiresIn / 86400 });
    Cookies.set("username", user.username, { expires: user.expiresIn / 86400 });
    Cookies.set("email", user.email, { expires: user.expiresIn / 86400 });
    Cookies.set("tokenExpiration", expirationTime.toString(), { expires: user.expiresIn / 86400 });
  };

  // Function to log out the user
  const logout = () => {
    setUsername("");
    setEmail("");
    setToken(null);

    // Remove values from cookies
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("email");
    Cookies.remove("tokenExpiration");
  };

  useEffect(() => {
    // Check if the token has expired on component mount
    if (isTokenExpired()) {
      logout();
    } else {
      // Optionally check token expiration every minute
      const intervalId = setInterval(() => {
        if (isTokenExpired()) {
          logout();
        }
      }, 60000); // Check every 60 seconds

      return () => clearInterval(intervalId); // Clean up on unmount
    }
  }, []);

  return (
    <AuthContext.Provider value={{ doctors, appointments, bookAppointment, token, username, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
