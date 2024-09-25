import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensuring email is unique
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Ensure username is included and unique
});

const User = mongoose.model('User', userSchema);
export default User;
