
var mongoose = require('mongoose');
 
var Timetable = new mongoose.Schema({
    Year: String,
    
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Timetable', Timetable);