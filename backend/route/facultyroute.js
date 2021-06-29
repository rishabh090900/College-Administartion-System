const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty =require( '../models/faculty');
const Subject =require( '../models/subject');

const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';
router.get("/addfaculty",async (req,res) => {
    try{
        
        const user = await Faculty.find()
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})

router.delete("/addfaculty/:id",function(req,res,next){

    var id=req.params.id;
    var getdata=Faculty.deleteOne({_id:id})
    getdata.exec()
    .then(data=>{
       console.log(data)        });
    })
router.post("/flogin",[

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
        
                let user = await Faculty.findOne({$and: [{"usertype": usertype},{"email":email}]});
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
router.get("/fsearchc/:userid",async (req,res) => {
    try{
        var id=req.params.userid;    
        const user = await Subject.find({subjfacemail:id})
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})


    router.get("/fsearch/:userid",function(req,res,next){

        var id=req.params.userid;
        var getdata=Faculty.find({email:id},{'name':1,'mobno':1,'usertype':1})
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
    


router.post("/addfaculty", 
[
    check('usertype','Invalid usertype').not().isEmpty(),
    check('name','Invalid Name').not().isEmpty(),
    check('mobno', 'Please enter valid mob no.').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with min 8 characters').isLength({min:"8"})

], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

       return res.status(400).json({errors: errors.array()})
    }
    
    const usertype = req.body.usertype;
    const name = req.body.name;
    const mobno = req.body.mobno;
    const email = req.body.email;
    const password = req.body.password;
    try{
        let user  = await Faculty.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists with this email"});
        }
        user = new Faculty({
            usertype,
            name,
            mobno,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

       await user.save()
       alert("Account Created please login to continue!")
       const payload = {
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
router.put("/addfaculty/:userid"
, async (req,res) => {
    const salt =  await bcrypt.genSalt(10);
    var id=req.params.userid;
    var item={

        
     name : req.body.name,
     mobno : req.body.mobno,
     email : req.body.email,
     password : req.body.password
     
    }
    item.password = await bcrypt.hash(req.body.password, salt);
    var getdata=UserProfile.updateOne({_id:id},{$set:item})
    
    getdata.exec()
    .then(data=>console.log(data))
    

    
    
   
    
})

module.exports = router;