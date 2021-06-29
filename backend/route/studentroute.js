const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student =require( '../models/student');
const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';
const Subject =require( '../models/subject');
const Attendance =require( '../models/attendance');

router.get("/addstudent",async (req,res) => {
    try{
        
        const user = await Student.find()
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})
router.delete("/addstudent/:id",function(req,res,next){

    var id=req.params.id;
    var getdata=Student.deleteOne({_id:id})
    getdata.exec()
    .then(data=>{
       console.log(data)        });
    })
  

router.post("/addstudent", 
[
    check('usertype','Invalid usertype').not().isEmpty(),
    check('name','Invalid Name').not().isEmpty(),
    check('rollno', 'Please enter valid roll no.').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with min 8 characters').isLength({min:"8"})

], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

       return res.status(400).json({errors: errors.array()})
    }
    
    const usertype = req.body.usertype;
    const name = req.body.name;
    const rollno = req.body.rollno;
    const email = req.body.email;
    const password = req.body.password;
    try{
        let user  = await Student.findOne({email});
        let user1  = await Student.findOne({rollno});
        if(user || user1){
            return res.status(400).json({message:"User already exists "});
            
        }
        user = new Student({
            usertype,
            name,
            rollno,
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

router.post("/slogin",[

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
    
            let user = await Student.findOne({$and: [{"usertype": usertype},{"email":email}]});
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
    router.get("/ssearch/:userid",function(req,res,next){

        var id=req.params.userid;
        var getdata=Student.find({email:id},{'name':1,'rollno':1,'usertype':1})
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
    router.get("/ssearchc/:userid",async (req,res) => {
        try{
            var id=req.params.userid;    
            const user = await Subject.find({subjstud :{$all:[id]}})
            
            
            res.json(user)
            
            
        } catch (error) {
            console.log("Catch Error get request!")
            res.status(500).json({error})
        }
    })
    
    router.get("/ssearcha/:course/:userid",async (req,res) => {
        try{
            var id1=req.params.course;   
            var id=req.params.userid;    
            const user = await Attendance.find({subjname:id1,attendence :{$all:[id]}})
            
            
            res.json(user)
            
            
        } catch (error) {
            console.log("Catch Error get request!")
            res.status(500).json({error})
        }
    })
    
    

module.exports = router;
