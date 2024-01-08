const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    resource: {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
