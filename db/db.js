const mongoose = require('mongoose');
require('dotenv').config();


const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const url = `mongodb+srv://${username}:${password}@database.ithr0wo.mongodb.net/weblog`;

mongoose.connect(url);



const postSchema = new mongoose.Schema({
  title: String,
  content: String,

    name : String,
    desc : String,
    img:{
      // The important point here is that our data type for the image is a Buffer
      // which allows us to store our image as data in the form of arrays.
      data : Buffer,
      contetntType : String
}});


const Post = mongoose.model('post', postSchema);



module.exports = {Post};
