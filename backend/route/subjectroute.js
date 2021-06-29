const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Subject =require( '../models/subject');
const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const { SubjectSharp } = require('@material-ui/icons');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';
const Faculty =require( '../models/faculty');

router.get("/subject",async (req,res) => {
    try{
        
        const user = await Subject.find()
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})

router.get("/subject/:userid",async (req,res) => {
    try{
        var id=req.params.userid;
        const user = await Subject.findOne({subjname:id})
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})

router.post("/subject", 
[
    check('subjcode','Invalid usertype').not().isEmpty(),
    check('subjname','Invalid Name').not().isEmpty(),
    check('subjfac', 'Please enter valid roll no.').not().isEmpty(),
    check('subjfacemail', 'Please enter valid email').isEmail()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

       return res.status(400).json({errors: errors.array()})
    }
    
    const subjcode = req.body.subjcode;
    const subjname = req.body.subjname;
    const subjfac = req.body.subjfac;
    const subjfacemail = req.body.subjfacemail;
    const subjdesc= req.body.subjdesc;
    const subjdiscussion= req.body.subjdiscussion;
    const subjstud = req.body.subjstud;
    const subjattend = req.body.subjattend;
    
   
    try{
        let user  = await Subject.findOne({subjcode});
        let facemail = await Faculty.findOne({email:subjfacemail})
        if(user){
            return (res.status(400).json({message:"Subject Already registered"})
            ,
            alert("Subject Already registered")
            
            );
        }
        else if(!facemail){
            return (res.status(300).json({message:"Please Add Faculty"}),
            alert("faculty is not there")
            
            );
        }
        user = new Subject({
            subjcode,
            subjname,
            subjfac,
            subjfacemail,
            subjdesc,
            subjdiscussion,
            subjstud,
            subjattend
        })
      
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
      
    console.log(err);
    res.sendStatus(500);
    }
    
    
    

    
    
   
    
})
router.put("/subject/:userid"
, async (req,res) => {
    var id=req.params.userid;
    var item={

         subjdiscussion: req.body.subjdiscussion,    
        subjstud : req.body.subjstud,
        subjattend : req.body.subjattend
    }
    var getdata=Subject.updateOne({subjname:id},{$push:item})
    getdata.exec()
    .then(data=>console.log(data))
    
})

router.delete("/subject/:id",function(req,res,next){
 
    var id=req.params.id;

    var getdata=Subject.updateOne( { subjname: id }, { $pop : {subjdiscussion: 1 } } )

    getdata.exec()
    .then(data=>{
       console.log(data)        });
    })

module.exports = router;