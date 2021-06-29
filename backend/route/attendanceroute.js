const express=require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Attendence =require( '../models/attendance');

const { check, validationResult } =require( 'express-validator');
const alert =require( 'alert');
const JWT_Secret = 'jhvfjhvfehfvhfvhefcehffeyfeyfeyfyefeyfyeyegfe';

router.get("/attendance/:userid",async (req,res) => {
    try{
        var id=req.params.userid;
        const user = await Attendence.find({subjname:id})
        
        
        res.json(user)
        
        
    } catch (error) {
        console.log("Catch Error get request!")
        res.status(500).json({error})
    }
})
router.post("/attendance", 
[
    check('subjname','Invalid subjname').not().isEmpty(),
    check('date', 'Please enter valid date.').isDate()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){

       return res.status(400).json({errors: errors.array()})
    }
    
    const subjname = req.body.subjname;
    const date = req.body.date;
    const attendence = req.body.attendence;

        user = new Attendence({
            subjname,
            date,
            attendence
        })

       await user.save()
           res.status(201);
       })
       router.get("/attendance/:userid/:user",async (req,res) => {
        try{
            var id=req.params.userid;
            var id1=req.params.user;
            
            const user = await Attendence.find({subjname:id , date:id1})
            
            
            res.json(user)
            
            
        } catch (error) {
            console.log("Catch Error get request!")
            res.status(500).json({error})
        }
    })
    router.delete("/attendanced/:course/:date/:id",function(req,res,next){

        var id1=req.params.course;
        var id2=req.params.date;
        
        var id=req.params.id;
        var getdata=Attendence.updateOne({subjname:id1,date:id2},{ $pull: { attendence:id }})
        getdata.exec()
        .then(data=>{
           console.log(data)        });
        })
        router.put("/attendanced/:course/:date/:id",function(req,res,next){

            var id1=req.params.course;
            var id2=req.params.date;
            var id=req.params.id;
            var getdata=Attendence.updateOne({subjname:id1,date:id2},{ $push: { attendence:id }})
            getdata.exec()
            .then(data=>{
               console.log(data)        });
            })
       
       module.exports = router;