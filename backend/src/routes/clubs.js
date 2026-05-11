const express = require('express');
const { getClubs, getClub, createClub } = require('../controllers/clubs');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClub);
router.post('/', protect, authorize('admin', 'organizer'), createClub);

module.exports = router;
