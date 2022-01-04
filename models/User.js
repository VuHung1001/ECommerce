const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {type: String}
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", UserSchema);
