const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { 
    type: String, 
    enum: ['student', 'organizer', 'admin'], 
    default: 'student' 
  },
  college: { type: String },
  avatar: { type: String, default: 'https://res.cloudinary.com/demo/image/upload/v1625213707/avatar.png' },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
  badges: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
