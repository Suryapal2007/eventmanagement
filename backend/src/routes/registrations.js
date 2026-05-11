const express = require('express');
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations
} = require('../controllers/registrations');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, registerForEvent);
router.get('/my', protect, getMyRegistrations);
router.get('/event/:id', protect, authorize('organizer', 'admin'), getEventRegistrations);

module.exports = router;
