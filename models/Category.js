const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const CategorySchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  slug: {
    type: String,
    require: true,
  },
});

CategorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
