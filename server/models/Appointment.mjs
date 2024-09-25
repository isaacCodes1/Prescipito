import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: { 
    email: { type: String, required: true },
    username: { type: String, required: true }, // Add username field
    avatar: { type: String, default: '' } // Add avatar field for user profile image
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  time: { type: String, required: true },
  day: { type: String, required: true },
  state: { 
    type: String, 
    enum: ['booked', 'paid', 'cancelled'], // Updated appointment states
    default: 'booked' // Default to 'booked'
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
