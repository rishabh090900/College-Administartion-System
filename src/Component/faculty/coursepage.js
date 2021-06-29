import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from 'react-bootstrap/Table'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
class Coursepage extends Component {
constructor(){
    
super()

this.state={
    newdisc:'',
discussion:[]

}

}
handleInputChange=(e)=>{
const name = e.target.name;
const value = e.target.value;
this.setState({
    [name]: value
});
}
submit = (event) => {
    event.preventDefault();
    const body1 = {
        subjdiscussion:this.state.newdisc
    }
axios.put('http://localhost:4000/api/subject/'+localStorage.getItem("fcourse"),body1)
.then(response => console.log(response.data))
this.setState({
    newdisc:''
})
window.location.reload()   

}
delete=(e)=>{
    var item = e.target.value; 
    console.log(item)
axios.delete('http://localhost:4000/api/subject/'+localStorage.getItem("fcourse"))
 .then(console.log(item))
window.location.reload()
  }
componentDidMount() {

    fetch("http://localhost:4000/api/subject/"+localStorage.getItem("fcourse"))
    .then(res => res.json())
      .then(data =>
        {const discussion =data.subjdiscussion
            this.setState({ discussion})})
        
     
  }

render() {
    if (localStorage.getItem("fcourse")!=null) {
    return (
    <div >
    <div >
    <h1 style={{fontFamily:"serif",width:"500px",marginTop:"100px",marginLeft:"600px",borderRadius:"2px",borderColor:"black"}}>{localStorage.getItem("fcourse")}</h1>
    <hr style={{backgroundColor:"black",width:"1920px"}}></hr>
    </div>
    
<div style={{width:"800px" , marginTop:"20px"}}>
    <Link to= "/faculty/course/markattendance">
<Card style={{border:"2px solid black",borderColor:"black",width:"300px",height:"200px",backgroundColor:"white",color:"black",fontFamily:"serif",fontSize:"20px"}} className="card">
<Typography style={{width:"350px",marginLeft:"-18px"}}className="cardtitle" >
           <h2> Mark Attendance</h2>
          </Typography>
         
        <CardContent style={{border:"2px ",borderColor:"white"}}>
            In this Page you Can Mark Attendnace Of Students Present          
        </CardContent>
    </Card>
    </Link>
    <Card style={{border:"2px solid black",borderColor:"black",width:"300px",height:"200px",backgroundColor:"white",color:"black",fontFamily:"serif",fontSize:"20px"}} className="card">
<Typography style={{width:"350px",marginLeft:"-18px"}}className="cardtitle" >
           <h2> Add Marks</h2>
          </Typography>
         
        <CardContent style={{border:"2px ",borderColor:"white"}}>
            In this Page you Can Add marks Of Students <br></br>
            This feature is not working now          
        </CardContent>
    </Card>

    <Link to= "/faculty/course/manageattendance">
    <Card style={{border:"2px solid black",borderColor:"black",width:"300px",height:"200px",backgroundColor:"white",color:"black",fontFamily:"serif",fontSize:"20px"}} className="card">
<Typography style={{width:"350px",marginLeft:"-18px"}}className="cardtitle" >
           <h2> Manage Attend.</h2>
          </Typography>
         
        <CardContent >
            In this Page you Can Manage Attendance           
        </CardContent>
    </Card>
  </Link>
    <Card style={{border:"2px solid black",borderColor:"black",width:"300px",height:"200px",backgroundColor:"white",color:"black",fontFamily:"serif",fontSize:"20px"}} className="card">
<Typography style={{width:"350px",marginLeft:"-18px"}}className="cardtitle" >
           <h2> Assignment</h2>
          </Typography>
         
        <CardContent style={{border:"2px ",borderColor:"white"}}>
            In this Page you Can Manage Assignment <br></br>
            This feature is not working now          
        </CardContent>
    </Card>

</div>
<div style={{width:"900px",height:"500px",marginLeft:"800px",marginTop:"60px"}}>
<h3 style={{backgroundColor:"black",color:"white",fontFamily:"serif",fontSize:"40px",paddingTop:"10px"}}>Disscussion</h3>
<form style={{backgroundColor:"black",height:"100px",marginTop:"-15px",paddingTop:"10px"}} onSubmit={this.submit}>
          <input style={{width:"700px",borderRadius:"10px"}}
          type='text'
          name="newdisc"
            placeholder="Enter Your Message"
            value={this.state.newdisc}
            onChange={this.handleInputChange}
          />
        <button type="submit" value="submit" style={{width:"160px",marginLeft:"250px",marginTop:"13px",backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block"  >Add Message</button>
        <button style={{float:"left",width:"160px",height:"45px",marginLeft:"430px",marginTop:"-140px",backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }}   
                 className="btn btn-primary btn-block"   onClick={this.delete}>Delete</button>
            
        </form>
<div>

    <form style={{border:"2px solid",borderColor:"black"}}>    
            {this.state.discussion.reverse().map((i) => 
            <div style={{fontFamily:"serif",fontSize:"20px",color:"black"}}><p>{i}</p>
            <hr style={{backgroundColor:"white",width:"900px"}}></hr></div> )}
             
            </form>

</div>

</div>
    </div>
    );
    } else {
    return (<div></div>);
    }
    }
   }
   export default Coursepage;
