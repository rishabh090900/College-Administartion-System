const mongoose=require('mongoose')
var Schema = mongoose.Schema;
var Student = new Schema({

    usertype:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    rollno:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
   
})
module.exports=mongoose.model('Student', Student);