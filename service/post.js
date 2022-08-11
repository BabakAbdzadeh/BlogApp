//  ------------------ requirements ------------------
const express = require("express");

const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');
const db = require('../db/db.js');

const fs = require('fs');
const path = require('path');
var multer = require('multer');


// ---------------- root path --------------------
const rootPath = path.join(__dirname, '../');


// --------------- initialization ---------------
const postService = express();
const Post = db.Post;

postService.set('view engine', 'ejs');

postService.use(bodyParser.urlencoded({
  extended: true
}));
postService.use(bodyParser.json());
postService.use(express.static("public"));



//------------ define the storage path -----------
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({
  storage: storage
});



// --------------- service -------------------
postService.get("/compose", (req, res) => {
  res.render("compose");
})


postService.post("/compose", upload.single('image'), (req, res) => {


  //  Too many code because of Synchronous => I have to improve it to async
  if (req.file) {
    const newPost = new Post({
      title: req.body.postTitle,
      content: req.body.postBody,
      name: req.body.name,
      desc: req.body.desc,
      img: {
        data: fs.readFileSync(path.join(rootPath + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      }
    });

    Post.create(newPost, (err, item) => {

      if (err) {
        console.log(err);
      } else {
        return;
      }
    });

  } else {
    const newPost = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });

    newPost.save();
  }
  res.redirect('/');

});


module.exports = postService;
