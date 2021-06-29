import React,{Component} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {  Redirect } from 'react-router-dom'
class Addstudent extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("token")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
       id:'',
    usertype:"Student",
    name:'',
    rollno:'',
    email: '',
    password: '',
    student:[],
    loggedIn
   }
    }
    handle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
  delete=(e)=>{
    var item = e.target.value; 
    console.log(item)
axios.delete('http://localhost:4000/api/addstudent/'+item)
 .then(console.log(item))
window.location.reload()
  }
    submit = (event) => {
        event.preventDefault();
        const body1 = {
            usertype: this.state.usertype,
            name: this.state.name,
            rollno: this.state.rollno,
            email: this.state.email,
            password: this.state.password,
            
        }
    axios.post('http://localhost:4000/api/addstudent',body1)
    .then(response => console.log(response.data))
    this.setState({
        name:'',
        rollno:'',
        email: '',
        password: ''
    
    })
    window.location.reload()   
    
}
componentWillMount() {
    fetch("http://localhost:4000/api/addstudent")
      .then(res => res.json())
      .then(data => this.setState({ student: data }));
  }

       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           const Student = this.state.student.map(Student => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={Student.id}>
                <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    
      <td style={{width:"30%"}}>{Student.rollno}</td>
      <td style={{width:"30%"}}>{Student.name}</td>
      <td style={{width:"40%"}}>{Student.email}</td>
      <button style={{borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={Student._id}  
                    onClick={this.delete}>Delete</button>
    </tr>
  </tbody>
</Table>

</div>
          ));
           return (
            <div>
            <div style={{height:"50px", backgroundColor:"black", color:"whitesmoke"}}>
            <h3>College Administartion System</h3>

            </div>

      <form 
      style={{width:"600px",borderRadius:"10px", marginTop:"50px", float:"left",marginLeft:"50px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}} 
      action="" method="post" onSubmit={this.submit}>
          <h3>ADD Student</h3>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="name">Enter Student Name</label>
              <input type="text" className="form-control" required  
              name="name" placeholder="Enter Student Name"
              value={this.state.name}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="rollno">Enter Roll no.</label>
              <input type="text" className="form-control" required  
              name="rollno" placeholder="Enter Roll No."
              value={this.state.rollno}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="email">Email</label>
              <input type="email" className="form-control" required  
              name="email" placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
          <label style={{ float:"left"}} htmlFor="password">Date Of Birth</label>
              <input type="date" className="form-control" 
              name="password" placeholder="Enter Date of Birth"
              value={this.state.password}
              onChange={this.handle}  />
          </div>
        <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block"  >Add Student</button>
      </form>
      <div style={{width:"800px ",float:"left",marginTop:"50px",marginLeft:"130px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>
<th style={{width:"28%"}}>Roll no.</th>
<th style={{width:"25%"}}>Name</th>
<th style={{width:"47%"}}>Email</th>
</tr>
</thead></Table>
     {Student}
</div>
      </div>
   )}}
        export default Addstudent