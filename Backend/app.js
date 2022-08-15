const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully"
  });
})


app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "fghv678",
      title: "First server-side post",
      content: "This is coming from server!"
    },
    {
      id: "ijkmn78",
      title: "Second server-side post",
      content: "This is coming from server!"
    }
  ];
  res.status(200).json(
    {
      message: "Posts fetched successfully!",
      posts: posts
    }
  )
})

module.exports = app;
