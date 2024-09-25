import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-50 px-4">
      {/* Title */}
      <h2 className="text-4xl font-bold mb-6 text-primary">Payment Successful!</h2>

      {/* Centered Success GIF */}
      <div className="mb-6 w-52 h-52 bg-blue-200 rounded-full flex items-center justify-center shadow-lg">
        <img
          src="/src/assets/success.gif" // Replace with the path to your GIF
          alt="Payment Success"
          className="w-36 h-36 object-cover rounded-full"
        />
      </div>

      {/* Call to Action with background and link */}
      <div className="bg-primary text-white text-center p-6 rounded-lg shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <p className="mb-3 text-lg font-semibold">Let's book another appointment for you!</p>
        <p className="text-base mb-5">Your Health is our Topmost Priority!</p>
        <Link
          to="/doctors"
          className="bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition duration-300"
        >
          See All Doctors
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
