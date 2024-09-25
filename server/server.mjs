import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/User.mjs'; // Ensure the path ends with .mjs
import Doctor from './models/Doctor.mjs';
import Appointment from './models/Appointment.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User Registration
app.post('/signup', async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, username });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a token for the user session
    const loginToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send back the username along with the token
    res.status(200).json({ message: 'Login successful', token: loginToken, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
});

// Doctor Management
app.post('/api/doctors', async (req, res) => {
  const { name, image, specialty, availability } = req.body;

  try {
    const newDoctor = new Doctor({ name, image, specialty, availability });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor' });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Appointment Management
app.post('/api/appointments', async (req, res) => {
  const { userEmail, doctorId, time, day } = req.body;

  console.log('Request body:', req.body);  // Log the incoming data
  
  try {
    // Check if user exists
    const user = await User.findOne({ email: userEmail });
    console.log('User:', user);  // Log the user data

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAppointment = new Appointment({
      user: {
        email: user.email,
        avatar: user.avatar || '', // Fallback for avatar
        username: user.username,
      },
      doctor: doctorId,
      time,
      day,
    });

    const savedAppointment = await newAppointment.save();
    console.log('Saved appointment:', savedAppointment);  // Log saved appointment

    res.status(201).json({ message: 'Appointment booked successfully.' });
  } catch (error) {
    console.error('Error booking appointment:', error);  // Log the error
    res.status(500).json({ message: 'Error booking appointment: ' + error.message });
  }
});



// Get all appointments (for admin)
app.get('/api/appointments', async (req, res) => {
  try {
    console.log('Fetching all appointments...');
    const appointments = await Appointment.find()
      .populate('doctor', 'name image specialty');
      
    console.log('Fetched appointments:', appointments);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get appointments for a specific doctor
app.get('/api/appointments/doctor/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate('doctor', 'name image specialty') // Populate doctor details
      .populate('user', 'email avatar username') // Populate user details
      .exec();

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark an appointment as paid
app.put('/api/appointments/:id/pay', async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { state: 'paid' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
