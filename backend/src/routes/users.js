const express = require('express');
const { getMe, updateDetails, getUsers } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.get('/', protect, authorize('admin'), getUsers);

module.exports = router;
