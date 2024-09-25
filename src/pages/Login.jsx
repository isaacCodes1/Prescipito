import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Import the Auth context
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth(); // Access the login function from context
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For sign up
  const [username, setUsername] = useState(""); // For sign up
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when the form is submitted

    try {
      if (state === "Sign Up") {
        // Handle signup
        if (email && password && name && username) {
          const response = await axios.post("http://localhost:5000/signup", {
            email,
            password,
            name,
            username,
          });

          // Show success toast
          toast.success(response.data, { position: "top-center" });

          // Clear fields after successful signup
          setEmail("");
          setPassword("");
          setName("");
          setUsername("");

          // Switch to login state
          setState("Login");
        } else {
          toast.error("Please fill in all fields for sign up.", {
            position: "top-center",
          });
        }
      } else if (state === "Login") {
        // Handle login
        if (email && password) {
          const response = await axios.post("http://localhost:5000/login", {
            email,
            password,
          });

          if (response.data.token) {
            // Extract token and username from response
            const { token, username, email, expiresIn } = response.data;

            // Call the login function from context with the token and username
            login({ token, username, email, expiresIn });

            // Show a toast for successful login
            toast.success(
              "Logged in successfully, redirecting to the homepage...",
              { position: "top-center" }
            );

            // Redirect after a short delay to allow the user to read the toast message
            setTimeout(() => {
              navigate("/"); // Redirect to homepage
            }, 2000); // Adjust the delay time as needed
          } else {
            throw new Error("Invalid login response.");
          }
        } else {
          toast.error("Please enter your email and password.", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      // Handle error responses
      setLoading(false); // Set loading to false in case of error
      const errorMessage = error.response?.data || "An error occurred.";
      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account🚀" : "Login👋🏻"}
          </p>
          <p>
            Please, {state === "Sign Up" ? "sign up" : "log in"} to book an appointment.
          </p>

          {state === "Sign Up" && (
            <>
              <div className="w-full">
                <p>Full Name</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="w-full">
                <p>Username</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
            </>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <div className="relative w-full">
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {loading ? (
            <div className="w-full flex justify-center py-2">
              <div className="loader border-t-4 border-primary w-8 h-8 rounded-full animate-spin"></div>
            </div>
          ) : (
            <button className="bg-primary text-white w-full py-2 rounded-md text-base">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          )}

          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new Account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>

      <style>
        {`
          .loader {
            border-color: #3e6ede transparent transparent transparent;
          }
        `}
      </style>
    </>
  );
};

export default Login;
