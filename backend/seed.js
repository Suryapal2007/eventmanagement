const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Event = require('./src/models/Event');

dotenv.config();

const events = [
  {
    title: "TechNova Hackathon 2024",
    description: "A 48-hour hackathon to build innovative solutions for sustainable cities.",
    category: "Hackathons",
    venue: "Main Auditorium, MIT",
    startDate: new Date("2024-06-15T09:00:00"),
    endDate: new Date("2024-06-17T18:00:00"),
    registrationDeadline: new Date("2024-06-10T23:59:59"),
    maxParticipants: 200,
    teamSize: { min: 2, max: 4 },
    isPaid: true,
    price: 500,
    status: "published"
  },
  {
    title: "Cultural Night: Rhythm 2024",
    description: "An evening of dance, music, and drama showcasing the diverse culture of our campus.",
    category: "Cultural",
    venue: "Open Air Theatre",
    startDate: new Date("2024-07-20T18:00:00"),
    endDate: new Date("2024-07-20T22:00:00"),
    registrationDeadline: new Date("2024-07-15T23:59:59"),
    maxParticipants: 1000,
    teamSize: { min: 1, max: 10 },
    isPaid: false,
    price: 0,
    status: "published"
  },
  // Add more dummy events here to reach 20
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Create a dummy organizer
    let organizer = await User.findOne({ role: 'organizer' });
    if (!organizer) {
      organizer = await User.create({
        name: 'John Organizer',
        email: 'organizer@example.com',
        password: 'password123',
        role: 'organizer',
        college: 'MIT'
      });
    }

    // Clear existing events
    await Event.deleteMany({});

    // Add organizer ID to events
    const eventsWithOrganizer = events.map(event => ({
      ...event,
      organizer: organizer._id
    }));

    // Add more events to make it 20
    const categories = ['Technical', 'Sports', 'Workshops', 'Seminars', 'Webinars', 'Placement Drives', 'Club Activities'];
    for (let i = eventsWithOrganizer.length; i < 20; i++) {
      eventsWithOrganizer.push({
        title: `Event ${i + 1}`,
        description: `Description for event ${i + 1}`,
        category: categories[i % categories.length],
        venue: `Venue ${i + 1}`,
        startDate: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000),
        registrationDeadline: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        organizer: organizer._id,
        status: "published"
      });
    }

    await Event.insertMany(eventsWithOrganizer);
    console.log('Database Seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
