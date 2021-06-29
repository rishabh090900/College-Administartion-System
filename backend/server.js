const express=require('express')
const app=express()
const mongoose= require('mongoose')
const routeurls=require('./route/userroute')
const loginurls=require('./route/loginroute')
const studenturls=require('./route/studentroute')
const facultyurls=require('./route/facultyroute')
const subject=require('./route/subjectroute')
const Attendence=require('./route/attendanceroute')
const TT =require('./route/timetableroute')
var bodyParser = require('body-parser');
const cors=require('cors')
mongoose.connect('mongodb+srv://rishabh:Rishabhs@cluster0.2shb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',() =>console.log('database connected'))

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine
app.set("view engine", "ejs");
//app.use(app.router);
app.use("/api",routeurls)
app.use("/api",studenturls)
app.use("/api",facultyurls)
app.use("/api",loginurls)
app.use("/api",subject)
app.use("/api",Attendence)
app.use("/api",TT)
app.listen(4000, () => console.log("server is running"))