import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Payment from "./pages/PaymentPage"; // Import your payment page
import PaymentSuccess from "./pages/PaymentSuccess"; // Import your payment success page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct import path
import Modal from 'react-modal'; // Import Modal
import AdminPage from "./pages/AdminPage"; // Import AdminPage

const App = () => {
  // Set the app element for accessibility
  Modal.setAppElement('#root');

  return (
    <div className="mx-4 sm:mx-[10%]">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/payment" element={<Payment />} /> {/* Add payment route */}
          <Route path="/payment-success" element={<PaymentSuccess />} /> {/* Add payment success route */}
          <Route path="/admin" element={<AdminPage />} /> {/* Add Admin route */}
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default App;
