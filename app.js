const express = require("express");
const mongoose = require("mongoose");

const Post = require("./models/Post");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.post("/add-post", async (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    slug: req.body.title,
  };
  await Post.create(data);
  res.redirect("/add-post");
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
