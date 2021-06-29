const mongoose=require('mongoose')
var Schema = mongoose.Schema;
var Subject = new Schema({

    subjcode:{
        type: String,
        required: true
    },
    subjname:{
        type: String,
        required: true
    },
    subjfac:{
        type: String,
        required: true
    },
    subjfacemail:{
        type: String,
        required: true
    },
    subjdesc:{
        type: String,
        required: true
    },
    subjdiscussion:{
        type: [String]
        
    },
    subjstud:{
        type: [String]
        
    },
    subjattend:{
        type: [String]
        
    }
   
})
module.exports=mongoose.model('Subject', Subject);