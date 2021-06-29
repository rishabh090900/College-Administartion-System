const mongoose=require('mongoose')
var Schema = mongoose.Schema;
var Attendence = new Schema({

    
    subjname:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    attendence:{
        type: [String]
        
    }
   
})
module.exports=mongoose.model('Attendence', Attendence);