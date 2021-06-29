import React,{Component} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {  Redirect } from 'react-router-dom'
class Addfaculty extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("token")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
    usertype:"Faculty",
    name:'',
    mobno:'',
    email: '',
    password: '',
    faculty:[],
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
  
    submit = (event) => {
        event.preventDefault();
        const body1 = {
            usertype: this.state.usertype,
            name: this.state.name,
            mobno: this.state.mobno,
            email: this.state.email,
            password: this.state.password,
            
        }
    axios.post('http://localhost:4000/api/addFaculty',body1)
    .then(response => console.log(response.data))
    this.setState({
        name:'',
        mobno:'',
        email: '',
        password: ''
    })   
    window.location.reload()   
    }
    delete=(e)=>{
        var item = e.target.value; 
        console.log(item)
    axios.delete('http://localhost:4000/api/addfaculty/'+item)
     .then(console.log(item))
    window.location.reload()
      }
    componentWillMount() {
        fetch("http://localhost:4000/api/addfaculty")
          .then(res => res.json())
          
          .then(data => this.setState({ faculty: data }));
      }
       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           const Faculty = this.state.faculty.map(faculty => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={faculty.id}>
                <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    
      
      <td style={{width:"30%"}}>{faculty.name}</td>
      <td style={{width:"40%"}}>{faculty.email}</td>
      <td style={{width:"30%"}}>{faculty.mobno}</td>
      <button style={{borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={faculty._id}  
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
          <h3>ADD Faculty</h3>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="name">Enter Faculty Name</label>
              <input type="text" className="form-control" required  
              name="name" placeholder="Enter Faculty Name"
              value={this.state.name}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="mobno">Enter Mobile no.</label>
              <input type="text" className="form-control" required  
              name="mobno" placeholder="Enter Mobile no."
              value={this.state.mobno}
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
          <label style={{ float:"left"}} htmlFor="password">Date of Birth</label>
              <input type="date" className="form-control" 
              name="password" placeholder="Enter date of birth"
              value={this.state.password}
              onChange={this.handle}  />
          </div>
        <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block">Add Faculty</button>
      </form>
      <div style={{width:"800px ",float:"left",marginTop:"50px",marginLeft:"130px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>

<th style={{width:"27%"}}>Name</th>
<th style={{width:"37%"}}>Email</th>
<th style={{width:"40%"}}>Mobile no.</th>
</tr>
</thead></Table>
     {Faculty}
</div>
      </div>
   )}}
        export default Addfaculty