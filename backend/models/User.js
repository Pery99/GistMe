const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        "https://i.pinimg.com/736x/f7/12/4b/f7124be7aa0d7c54995e181149996b14.jpg",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    bio: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
