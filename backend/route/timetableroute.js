var TT = require('../models/timetable');
var multer = require('multer');
const express=require('express');
const app = express.Router();
var path = require('path');
var fs = require('fs');
const sharp = require('sharp');
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 10
//     }
// })
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
const upload = multer({ 
    
    fileFilter(req,file,cb){
        if( !file.originalname.match(/\.(jpg||jpeg||png)$/) ){
            return cb(new Error('Upload a file with jpg,jpeg,png format'))
        }
        cb(undefined,true)
    }
})

app.post('/timetable',upload.single('image'),async(req,res)=>{
    req.body.Year = req.body.Year;
    
    const buffer1 = await sharp(req.body.img).toBuffer()
    
    req.body.img = buffer1;
     const resource = new TT(req.body);
    await resource.save()
    res.send()
    
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

app.get('/timetable', (req, res) => {
    TT.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});
// app.post('/timetable', upload.single('image'), (req, res, next) => {
 
//     var obj = {
//         Year: req.body.Year,
//         img: req.file.filename

//     }
//     TT.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             item.save();

//         }
// });
// });
module.exports = app;