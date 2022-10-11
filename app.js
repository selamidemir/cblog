const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Post = require("./models/Post");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

mongoose
  .connect("mongodb://localhost:27017/cleanblog-db")
  .then(() => console.log("Veritabanına bağlanıldı"));

// Form body bilgisinin yakalanması için
// bu iki middleware fonksiyonun çalışması gerekiyor
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const posts = await Post.find();

  res.render("index", {
    posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add-post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    slug: req.body.title,
  };
  await Post.create(data);
  res.redirect("/add-post");
});

app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.json({
      status: "fail",
      error: err,
    });
  }
});

app.get("/posts/update/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("update_post", { post });
  } catch (err) {
    res.json({
      status: "Fail",
      err,
    });
  }
});

app.put("/posts", async (req, res) => {
  try {
    const post = await Post.findById(req.query.id);
    post.title = req.body.title;
    post.description = req.body.description;
    post.save();

    res.redirect(`/posts/${post.slug}`);
  } catch (err) {
    res.json({
      status: "Fail",
      err,
    });
  }
});

app.get("/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug: slug });
    res.render("post", {
      post,
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log("Cblog uygulaması ayağa kalktı.");
});
