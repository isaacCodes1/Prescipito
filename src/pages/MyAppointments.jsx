import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to check login status
import Modal from 'react-modal';
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { doctors, appointments, setAppointments } = useContext(AppContext);
  const { token } = useAuth(); // Access token from AuthContext to check if user is logged in
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Get number of paid and canceled appointments
  const paidAppointmentsCount = appointments.filter(appointment => appointment.state === "paid").length;
  const canceledAppointmentsCount = appointments.filter(appointment => appointment.state === "cancelled").length;

  const handleCancelAppointment = () => {
    // Update appointments state to mark the current appointment as cancelled
    setAppointments(prev => 
      prev.map(appointment => 
        appointment === currentAppointment 
          ? { ...appointment, state: "cancelled" } 
          : appointment
      )
    );
    
    // toast.success("Appointment cancelled."); // Show success toast
    setIsModalOpen(false);
  };

  const handleOpenModal = (appointment) => {
    setCurrentAppointment(appointment);
    setIsModalOpen(true);
  };

  const handlePayment = (appointment) => {
    if (!token) { // Check if the user is not logged in
      toast.warning("Please create an account, Redirecting..."); // Show toast message
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 1 second
      }, 1000);
    } else {
      // Mark the appointment as paid and update the state
      setAppointments(prev => 
        prev.map(a => 
          a === appointment 
            ? { ...a, state: "paid" } 
            : a
        )
      );
      // toast.success("Appointment marked as paid.");

      // Redirect to payment success page
      navigate("/payment", { state: { appointmentDetails: appointment } });
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>

      {/* Show the count of paid and canceled appointments */}
      <div className="flex justify-between mb-4 cursor-pointer">
        {paidAppointmentsCount > 0 && (
          <p className="text-base bg-green-500 px-5 py-3 rounded-lg text-white mt-5 mb-5">
            {paidAppointmentsCount} person{paidAppointmentsCount > 1 ? 's' : ''} PAID
          </p>
        )}
        {canceledAppointmentsCount > 0 && (
          <p className="text-base bg-red-500 px-5 py-3 rounded-lg text-white mt-5 mb-5">
            {canceledAppointmentsCount} person{canceledAppointmentsCount > 1 ? 's' : ''} CANCELLED
          </p>
        )}
      </div>

      {appointments.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-700">You have no appointments booked.</p>
          <button 
            onClick={() => navigate("/doctors")} 
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300"
          >
            Book an Appointment Now
          </button>
        </div>
      ) : (
        appointments
          // Filter out the paid and cancelled appointments so they are not shown on the page anymore
          .filter(appointment => appointment.state !== "paid" && appointment.state !== "cancelled")
          .map((appointment, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
              <div>
                <img className="w-32 bg-indigo-50" src={doctors.find(doc => doc.name === appointment.doctor)?.image} alt="doctor" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{appointment.doctor}</p>
                <p>{doctors.find(doc => doc.name === appointment.doctor)?.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Date: {appointment.date} | Time: {appointment.time}</p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <div className="flex flex-col p-5 gap-2">
                  <button 
                    className="text-sm text-white w-40 bg-primary hover:bg-green-700 text-center py-2 border rounded transition-all duration-300 flex-1"
                    onClick={() => handlePayment(appointment)}
                  >
                    Pay Online
                  </button>
                  <button 
                    className="text-sm text-white bg-red-600 hover:bg-red-700 text-center py-2 border rounded transition-all duration-300 flex-1"
                    onClick={() => handleOpenModal(appointment)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
      )}

      {/* Modal for Cancel Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            width: '300px',
          },
        }}
        ariaHideApp={false}
      >
        <h2 className="text-center mb-4">Are you sure you want to cancel this appointment?</h2>
        <div className="flex gap-2">
          <button onClick={handleCancelAppointment} className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
          <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded">No</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyAppointments;
