import React,{Component} from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './admin.css'

import { BrowserRouter as Router, Redirect } from 'react-router-dom'
class Courses extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("token")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
    subjcode:'',
    subjname:'',
    subjfac:'',
    subjfacemail:'',
    subjdesc:''
   ,
    subject:[],

    loggedIn
   }
    }
    onSelect(course) {

        localStorage.setItem("course",course.subjname);
        window.location.href="http://localhost:3000/admin/coursestudent"   
    }
    handle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
  
    submit = (event) => {
        event.preventDefault();
        const body1 = {
            subjcode:this.state.subjcode,
            subjname:this.state.subjname,
            subjfac:this.state.subjfac,
            subjfacemail:this.state.subjfacemail,
            subjdesc:this.state.subjdesc  
        }
    axios.post('http://localhost:4000/api/subject',body1)
    .then(response => console.log(response.data))
    this.setState({
        subjcode:'',
        subjname:'',
        subjfac:'',
        subjfacemail:''
        ,subjdesc:''
    
    })
    window.location.reload()   
}
componentWillMount() {
    fetch("http://localhost:4000/api/subject")
      .then(res => res.json())
      .then(data => this.setState({ subject: data }));
  }

       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           const Subject = this.state.subject.map(Subject => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={Subject.id}>
     <Card style={{width:"350px",height:"600px", float:"left"}} className="card">
      <CardActionArea>
        <CardContent>
          <Typography style={{width:"350px",height:"100px",margin:"-15px"}}className="cardtitle" >
           <h2> {Subject.subjname}</h2>
          </Typography>
          <Typography style={{height:"350px" ,marginTop:"45px", fontSize:"20px"}} className="cardcontent">
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
      style={{height:"20px",backgroundColor:"black",marginLeft:"150px",color:"whitesmoke",padding:"25px"}} size="20px" color="primary">
         ADD STUDENTS
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