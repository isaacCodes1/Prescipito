import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate appointment statistics
  const totalBooked = appointments.length;
  const totalPaid = appointments.filter(appointment => appointment.state === "paid").length;
  const totalCancelled = appointments.filter(appointment => appointment.state === "cancelled").length;

  return (
    <div className="container mx-auto p-4">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Total Booked Appointments</h2>
          <p className="text-2xl">{totalBooked}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Paid Appointments</h2>
          <p className="text-2xl">{totalPaid}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold">Cancelled Appointments</h2>
          <p className="text-2xl">{totalCancelled}</p>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">All Appointments</h1>

        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-gray-100">#</th>
              <th className="px-4 py-2 border bg-gray-100">User Avatar</th>
              <th className="px-4 py-2 border bg-gray-100">Username</th>
              <th className="px-4 py-2 border bg-gray-100">User Email</th>
              <th className="px-4 py-2 border bg-gray-100">Doctor</th>
              <th className="px-4 py-2 border bg-gray-100">Appointment Time</th>
              <th className="px-4 py-2 border bg-gray-100">Appointment Day</th>
              <th className="px-4 py-2 border bg-gray-100">Status</th>
              <th className="px-4 py-2 border bg-gray-100">Payment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border text-center">
                  <img
                    src={appointment.user.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border text-center">{appointment.user.username}</td>
                <td className="px-4 py-2 border text-center">{appointment.user.email}</td>
                <td className="px-4 py-2 border text-center">{appointment.doctor.name}</td>
                <td className="px-4 py-2 border text-center">{appointment.time}</td>
                <td className="px-4 py-2 border text-center">{appointment.day}</td>
                <td className="px-4 py-2 border text-center">
                  <span className={`px-2 py-1 rounded-full text-white ${appointment.state === "paid" ? "bg-green-500" : appointment.state === "cancelled" ? "bg-red-500" : "bg-yellow-500"}`}>
                    {appointment.state.charAt(0).toUpperCase() + appointment.state.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  {appointment.state === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
