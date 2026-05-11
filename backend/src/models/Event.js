const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Technical', 'Cultural', 'Sports', 'Workshops', 'Hackathons', 'Seminars', 'Webinars', 'Placement Drives', 'Club Activities']
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
  venue: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: { type: Number },
  teamSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 1 }
  },
  poster: { type: String },
  banner: { type: String },
  rules: { type: String },
  prizePool: { type: String },
  coordinators: [{
    name: String,
    email: String,
    phone: String
  }],
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'ongoing', 'completed'], 
    default: 'published' 
  },
  tags: [{ type: String }],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
