const router = require("express").Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

// Put specific routes before parameter routes
router.get("/recent", auth, messageController.getRecentMessages);
router.post("/:receiverId", auth, messageController.sendMessage);
router.get("/:userId", auth, messageController.getMessages);

module.exports = router;
