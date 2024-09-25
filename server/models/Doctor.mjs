import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL to the doctor's image
  specialty: { type: String, required: true },
  availability: { type: [String], required: true } // Array of available time slots
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
