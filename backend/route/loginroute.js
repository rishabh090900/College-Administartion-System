
const express=require('express');
const loginrouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserProfile =require( '../models/user');
const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';
const token=require('./middleware')
loginrouter.get("/login",  token, async (req,res) => {
    try {
        
        const user = await UserProfile.findOne({"_id":req.user.id})
        console.log("Logged in")
        const userdata = [user]
        
        res.json(userdata)
            
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})

loginrouter.post("/login",[

check('usertype', 'Please enter valid usertype').exists(),
check('email','Please enter valid email').isEmail(),
check('password','Please enter correct passord').exists()

], async (req,res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }

    
    const usertype = req.body.usertype;
    const email = req.body.email;
    const password = req.body.password;

    try{

        let user = await UserProfile.findOne({$and: [{"usertype": usertype},{"email":email}]});
        const checkpassord = await bcrypt.compare(password,user.password);
        
        if(!user){
            
            return res.status(400).send({
                message: "User not found please ensure the usertype and email"
            })
        }
        else if(!checkpassord){
            return res.status(400).json({
                message: "Incorrect Passord"
            })
          
            
        }
        const payload = {
             user: {
             id: user.id
            }
            
        };
        jwt.sign(payload, JWT_Secret,{
            expiresIn: 360000
        }, (error,token) => {
            if(error) {
                console.log(error);
                res.sendStatus(500);
            }
            else{
                res.json({token})
                
                
                
            }
            
        })

    }catch(err){
        console.log("Server Error!")
        res.status(500).send("Server Error!")
    }
  
    

    
    
   
    
})
loginrouter.get("/search/:userid",function(req,res,next){

    var id=req.params.userid;
    var getdata=UserProfile.find({email:id},{'username':1,'usertype':1})
    getdata.exec()
    .then(data=>{
        res.status(200).json({
            results:data
        });
    })
    .catch(err=>{
res.json(err);

    })
})
module.exports=loginrouter;