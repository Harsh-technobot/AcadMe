const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportMongoose = require("passport-local-mongoose");

const imageSchema = new Schema({
  path: String,
  filename: String,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  foi: [String],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: imageSchema,
    default: {
      path: "/images/tanjiro.jpg",
      filename: "default.jpg",
    },
  },
  library: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  upvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  downvoted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
});

userSchema.plugin(passportMongoose, {
  usernameField: "email",
  errorMessages: {
    UserExistsError: "User with this email already exists",
  },
});

module.exports = mongoose.model("User", userSchema);
