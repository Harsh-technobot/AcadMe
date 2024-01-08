const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourcesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
    },
    embed: {
      type: String,
    },
    video_id: {
      type: String,
    },
    type: {
      type: String,
      enum: ["video", "pdf"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourcesSchema);
