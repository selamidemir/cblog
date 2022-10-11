const mongoose = require("mongoose");
var slugify = require("slugify");

const Schema = mongoose.Schema;

const PostSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PostSchema.pre("validate", function (next) {
  this.slug = slugify(this.slug, {
    lower: true,
    strict: true,
  });
  next();
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
