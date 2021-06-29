const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserProfile =require( '../models/user');
const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';


router.get("/addadmin",async (req,res) => {
    try{
        
        const user = await UserProfile.find()
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})







router.post("/addadmin", 
[
    check('usertype','Invalid usertype').not().isEmpty(),
    check('username', 'Please enter valid username').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with min 8 characters').isLength({min:"8"})

], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

       return res.status(400).json({errors: errors.array()})
    }
    
    const usertype = req.body.usertype;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        let user  = await UserProfile.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists with this email"});
        }
        user = new UserProfile({
            usertype,
            username,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

       await user.save()
       alert("Account Created please login to continue!")
       const payload = {
        //    user: {
        //        id: user.id
        //    }

           user: {
            id: user.id
        }

       };
       jwt.sign(payload, JWT_Secret,{
           expiresIn: 360000
       }, (error,tokens) => {
        if(error) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
            console.log(tokens)
            res.json(tokens)

            
           
        }
           
           res.status(201).json(tokens);
       })
    }
    catch(err){
        alert("Password length should be min 8")
    console.log(err);
    res.sendStatus(500);
    }
    
    
    

    
    
   
    
})




router.put("/addadmin/:userid"
, async (req,res) => {
    const salt =  await bcrypt.genSalt(10);
    var id=req.params.userid;
    var item={

        
     username : req.body.username,
     email : req.body.email,
     password : req.body.password
     
    }
    item.password = await bcrypt.hash(req.body.password, salt);
    var getdata=UserProfile.updateOne({_id:id},{$set:item})
    
    getdata.exec()
    .then(data=>console.log(data))
    

    
    
   
    
})
module.exports = router;