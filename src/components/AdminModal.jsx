import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminModal = ({ closeModal }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === "111111") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/admin"); // Navigate to the Admin page
        closeModal(); // Close the modal
      }, 3000);
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Access</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="loader border-t-4 border-primary w-12 h-12 rounded-full animate-spin"></div>
            <p className="mt-4 text-primary">Please wait...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded-md mb-4 text-center"
              maxLength={6}
              required
            />
            <button
              type="submit"
              className="bg-primary text-white py-2 rounded-md"
            >
              Verify OTP
            </button>
          </form>
        )}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>

      <style>
        {`
          .loader {
            border-color: #3e6ede transparent transparent transparent;
          }
        `}
      </style>
    </div>
  );
};

// Add PropTypes validation
AdminModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // Ensures closeModal is a required function
};

export default AdminModal;
