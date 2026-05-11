const Club = require('../models/Club');

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Public
exports.getClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find().populate('admin', 'name email');

    res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single club
// @route   GET /api/clubs/:id
// @access  Public
exports.getClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.id).populate('admin', 'name email');

    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }

    res.status(200).json({
      success: true,
      data: club
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new club
// @route   POST /api/clubs
// @access  Private/Admin
exports.createClub = async (req, res, next) => {
  try {
    const club = await Club.create(req.body);

    res.status(201).json({
      success: true,
      data: club
    });
  } catch (err) {
    next(err);
  }
};
