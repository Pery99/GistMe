const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile/:userId', auth, userController.getProfile);
router.get('/me', auth, userController.getMyProfile);
router.post('/friends/:friendId', auth, userController.addFriend);
router.get('/friends', auth, userController.getFriends);
router.get('/available', auth, userController.getAvailableUsers);

module.exports = router;
