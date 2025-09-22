const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, me } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', auth, me);

module.exports = router;
