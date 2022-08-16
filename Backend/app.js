const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://3venithoutu:gz5mfJU9zmj5WOug@cluster0.xkkojok.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to database!");
  })
  .catch((error) => {
    console.log("connection failed!", error);
  })
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded)
// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Access");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  //connecting to MongoDB
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save();
  res.status(201).json({
    message: "Post added successfully",
    post: post
  });
})


app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //     id: "fghv678",
  //     title: "First server-side post",
  //     content: "This is coming from server!"
  //   },
  //   {
  //     id: "ijkmn78",
  //     title: "Second server-side post",
  //     content: "This is coming from server!"
  //   }
  // ];
  Post.find().then(documents => {
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      })
  })
})

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted successfully"
    })
  })
})

module.exports = app;
