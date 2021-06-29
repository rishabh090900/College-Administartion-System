import React,{Component} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {  Redirect } from 'react-router-dom'
class Addadmin extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("token")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
    usertype:"Admin",
    username:'',
    email: '',
    password: '',
    admin:[],
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
            username: this.state.username,
             email: this.state.email,
            password: this.state.password,
            
        }
    axios.post('http://localhost:4000/api/addadmin',body1)
    .then(response => console.log(response.data))
    this.setState({
        username:'',
     
        email: '',
        password: ''
    })   
    window.location.reload()   
    }
    
    componentWillMount() {
        fetch("http://localhost:4000/api/addadmin")
          .then(res => res.json())
          .then(data => this.setState({ admin: data }));
      }
       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           const Admin = this.state.admin.map(admin => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={admin.id}>
                <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    
      
      <td style={{width:"30%"}}>{admin.username}</td>
      <td style={{width:"40%"}}>{admin.email}</td>

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
          <h3>ADD admin</h3>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="name">Enter Admin Name</label>
              <input type="text" className="form-control" required  
              name="username" placeholder="Enter admin Name"
              value={this.state.username}
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
          <label style={{ float:"left"}} htmlFor="password">Password</label>
              <input type="password" className="form-control" 
              name="password" placeholder="Enter password"
              value={this.state.password}
              onChange={this.handle}  />
          </div>
        <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block">Add admin</button>
      </form>
      <div style={{width:"800px ",float:"left",marginTop:"50px",marginLeft:"130px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>

<th style={{width:"30%"}}>Name</th>
<th style={{width:"40%"}}>Email</th>
</tr>
</thead></Table>
     {Admin}
</div>
      </div>
   )}}
        export default Addadmin