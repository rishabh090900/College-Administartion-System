import React,{Component} from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { Link, Route, BrowserRouter as Router,Switch, Redirect } from 'react-router-dom'
class Courses extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("stoken")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
    rollno:"",
    subject:[],

    loggedIn
   }
    }
     onSelect(course) {

         localStorage.setItem("scourse",course.subjname);
  window.location.href="http://localhost:3000/student/course/coursepage"   
     }

componentDidMount() {

    fetch("http://localhost:4000/api/ssearchc/"+localStorage.getItem("studentr"))
    .then(res => res.json())
      .then(data => this.setState({ subject: data }));
  }

       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/studentlogin'/>
           }
           const Subject = this.state.subject.map(Subject => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={Subject.id}>
     <Card style={{width:"350px",height:"500px", float:"left"}} className="card">
      <CardActionArea>
        <CardContent>
          <Typography style={{width:"350px",height:"100px" ,margin:"-15px",Align:"center"}}className="cardtitle" >
           <h2> {Subject.subjname}</h2>
          </Typography>
          <Typography style={{height:"300px" ,marginTop:"45px", fontSize:"20px"}} className="cardcontent">
            Taught By {Subject.subjfac}
            <br></br>       <hr></hr>

            Faculty Email                    {Subject.subjfacemail}
            <br></br>    <hr></hr>
            <h4> Course Description</h4>                {Subject.subjdesc}
                       </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Router>  
      <Button 
     onClick={() => this.onSelect(Subject)}
    
     >
         View More
        </Button>

      </Router>
      </CardActions>
    </Card>
</div>
          ));
          
           return (
            <div>
            <div style={{height:"50px", backgroundColor:"black", color:"whitesmoke"}}>
            <h3>College Administartion System</h3>

            </div>

    
      <div style={{width:"1900px"}} >
     
     {Subject}
</div>
      </div>
   )}}
        export default Courses