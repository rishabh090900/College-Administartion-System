const mongoose=require('mongoose')
var Schema = mongoose.Schema;
var Faculty = new Schema({

    usertype:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    mobno:{
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
module.exports=mongoose.model('Faculty', Faculty);