import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Preloader component
const Preloader = () => (
  <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-90 z-50">
    <div className="flex flex-col items-center">
      <svg 
        className="animate-spin h-20 w-20 text-primary" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
        ></path>
      </svg>
      <p className="mt-4 text-xl font-semibold text-primary">Processing Payment...</p>
    </div>
  </div>
);

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsLoading(true); // Show preloader

    // Simulate payment processing delay (3 seconds)
    setTimeout(() => {
      setIsLoading(false); // Hide preloader
      toast.success("Payment successful!");
      navigate("/payment-success"); // Redirect to payment success page
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {isLoading && <Preloader />} {/* Conditionally render the preloader */}

      <div className="payment-form bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Payment Details</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="flex flex-col">
          <input 
            type="text" 
            placeholder="Card Number" 
            required 
            className="border rounded-md p-2 mb-4 shadow focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-between mb-4">
            <input 
              type="text" 
              placeholder="Expiry Date (MM/YY)" 
              required 
              className="border rounded-md p-2 w-1/2 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input 
              type="text" 
              placeholder="CVV" 
              required 
              className="border rounded-md p-2 w-1/2 ml-2 shadow focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300 mb-4"
          >
            Pay Now
          </button>
        </form>
        <button 
          onClick={() => navigate("/my-appointments")} 
          className="text-blue-500 text-sm hover:underline focus:outline-none"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
