// const express = require('express');
// const service = express();
//
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
//
// const fs = require('fs');
// const path = require('path');
//
// var multer = require('multer');
//
// const db = require('../db/db.js');
// const Image = db.Image;
//
//
//
//
//
//
// // define the storage path for the image we are uploading
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// var upload = multer({ storage: storage });
//
//
//
// service.get('/', (req, res)=>{
//     Image.find({}, (err, items)=>{
//       if (err) {
//            console.log(err);
//            res.status(500).send('An error occurred', err);
//        }
//        else {
//            res.render('imagesPage', { items: items });
//        }
//     });
// });
//
// service.post('/', upload.single('image'), (req, res, next) => {
//     const rootPath = path.join(__dirname, '../');
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(rootPath +'/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     Image.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/upload');
//         }
//     });
// });
//
//
// module.exports = service;
