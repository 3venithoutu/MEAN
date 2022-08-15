const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("first middleware");
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Origin-Headers", "Origin, X-Requested-With, Content-Type, Access");
  res.setHeader("Access-Control-Origin-Method", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
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
  console.log("Hello");
  res.status('200').json(
    {
      message: "Posts fetched successfully!",
      posts: posts
    }
  )
})

module.exports = app;
