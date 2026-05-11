const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
exports.registerForEvent = async (req, res, next) => {
  try {
    const { eventId, teamName, members } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if registration deadline has passed
    if (new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({ success: false, message: 'Registration deadline has passed' });
    }

    // Create registration
    const registration = await Registration.create({
      event: eventId,
      student: req.user.id,
      teamName,
      members,
      paymentStatus: event.isPaid ? 'pending' : 'completed'
    });

    res.status(201).json({
      success: true,
      data: registration
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get student registrations
// @route   GET /api/registrations/my
// @access  Private
exports.getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ student: req.user.id }).populate('event');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get registrations for an event (Organizer only)
// @route   GET /api/registrations/event/:id
// @access  Private (Organizer/Admin)
exports.getEventRegistrations = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const registrations = await Registration.find({ event: req.params.id }).populate('student', 'name email college');

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (err) {
    next(err);
  }
};
