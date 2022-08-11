//jshint esversion:6

//  ------------------ requirements ------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');
const db = require('../db/db.js');

// ------------------ lurespam Data -----------------
let homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";




//  ------------------ setups ------------------------
const showService = express();
const Post = db.Post;


showService.set('view engine', 'ejs');

showService.use(bodyParser.urlencoded({
  extended: true
}));
showService.use(bodyParser.json());
showService.use(express.static("public"));








//  ------------- service -------------------
showService.get("/", (req, res) => {

  Post.find({}, (err, results) => {
    if (!err) {

      res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: results,

      });
    };
  });

});

showService.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
})

showService.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
})


// Dynamic URL
showService.get("/post/:postID", (req, res) => {

  // Matching URL with post title
  Post.findById(req.params.postID, (err, postObj) => {
    if (!err) {


      if (postObj._doc.hasOwnProperty('name')) {

        res.render('post', {
          post: postObj,
          key: 1
        });
      } else {
        res.render('post', {
          post: postObj,
          key: '0'
        });
      };
    };
  });
});


//  ------------ exports -----------------------

module.exports = showService;
