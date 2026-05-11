const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Load env vars
dotenv.config();

// Route files
const authRoutes = require('./src/routes/auth');
const eventRoutes = require('./src/routes/events');
const registrationRoutes = require('./src/routes/registrations');
const paymentRoutes = require('./src/routes/payments');
const userRoutes = require('./src/routes/users');
const clubRoutes = require('./src/routes/clubs');
const analyticsRoutes = require('./src/routes/analytics');
const notificationRoutes = require('./src/routes/notifications');

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());

// Security
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Passport middleware
app.use(passport.initialize());
require('./src/config/passport')(passport);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handler
app.use(require('./src/middleware/error'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
