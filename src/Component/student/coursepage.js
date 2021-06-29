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
constructor(props){
    
super(props)

this.state={
    
    newdisc:'',
    attendence:[],
    discussion:[]
}
}
componentWillMount() {
    axios.get("http://localhost:4000/api/ssearcha/"+localStorage.getItem("scourse")+"/"+localStorage.getItem("studentr"))
    
      .then(response =>
        this.setState({attendence:response.data}))
        .then(res => console.log(this.state.attendence));
      }
componentDidMount() {
    
    fetch("http://localhost:4000/api/subject/"+localStorage.getItem("scourse"))
    .then(res => res.json())
      .then(data =>
        {const discussion =data.subjdiscussion
            this.setState({discussion})})
                    
  }

render() {
    const Attendance = this.state.attendence.map((Attendance) => (
        <div 
       style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
        key={Attendance._id}>
            <Table striped bordered hover size="sm">

<tbody>
<tr style={{backgroundColor:"white"}}>

  <td style={{width:"30%"}}>{localStorage.getItem("studentr")}</td>
  <td style={{width:"30%"}}>{Attendance.date}</td>

</tr>
</tbody>
</Table>

</div>
      ));

    if (localStorage.getItem("scourse")!=null) {
        return (
    <div >
    <div >
    <h1 style={{fontFamily:"serif",width:"500px",marginTop:"100px",marginLeft:"600px",borderRadius:"2px",borderColor:"black"}}>{localStorage.getItem("scourse")}</h1>
    <hr style={{backgroundColor:"black",width:"2100px"}}></hr>
    </div>
    <div style={{width:"800px ",float:"left",marginTop:"50px",marginLeft:"50px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>
<th style={{width:"30%"}}>Roll no.</th>
<th style={{width:"30%"}}>Present On</th>
</tr>
</thead></Table>
     {Attendance}
</div>
<div style={{width:"900px",height:"500px",marginLeft:"900px",marginTop:"60px"}}>
<h3 style={{backgroundColor:"black",color:"white",fontFamily:"serif",fontSize:"40px",paddingTop:"10px"}}>Disscussion</h3>
<div >

    <form style={{border:"2px solid",borderColor:"black",marginTop:"-10px"}}>    
            {this.state.discussion.reverse().map((i) => 
            <div style={{align:"left",fontFamily:"serif",fontSize:"30px"}}>{i}
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
