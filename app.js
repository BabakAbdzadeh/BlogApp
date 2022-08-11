//jshint esversion:6

//  ------------------ requirements ------------------
const express = require("express");
const app = express();


//  ------------------- services installation ----------
      app
      .use('/', require('./service/post.js'))
      .use('/', require('./service/show.js'))
      .listen(process.env.PORT || 3000, () => {
        console.log("Server started on port 3000");
      });
