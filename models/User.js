const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    loginByGoogle: {type: Boolean, default: false},
    img: {type: String, default: "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("User", UserSchema);
