import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [appointments, setAppointments] = useState(() => {
    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem("appointments");
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  });

    // Effect to save appointments to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments]);
  

  const bookAppointment = (appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  const value = {
    doctors,
    currencySymbol,
    appointments,
    setAppointments, // Add this line to provide appointments
    bookAppointment, // Add this line to provide the bookAppointment function
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
