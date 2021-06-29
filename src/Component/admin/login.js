import React,{Component} from 'react'
import axios from 'axios'
import './admin.css'


import {  Redirect } from 'react-router-dom'
class Login extends Component {
    constructor (props) {
        let loggedIn=false
        super(props);
        this.state = {
            usertype:"Admin",
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
            grant_type: 'password',
            client_secret: '****',
            client_id: '****'
        }
    axios.post('http://localhost:4000/api/login',body1)
    .then(response => sessionStorage.setItem("token",response.data.token))
.then(localStorage.setItem("user",this.state.email))    
    this.setState({
        loggedIn:true
    })
}
    
    render () {
        if(this.state.loggedIn){
            return <Redirect to='/admin'/>
         }
         
      return (
        <div style={{height:"969px" , backgroundImage:'url("admin.jpg")',backgroundSize:"1920px"}}>
        <h1 style={{fontFamily:"serif",fontSize:"60px",padding:"30px", color:"black"}}>College Administartion System</h1>
       
        <form className="login" 
        style={{width:"600px",borderRadius:"10px", marginTop:"50px", marginLeft:"650px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}} 
        action="" method="post" onSubmit={this.submit}>
            <h3>ADMIN LOGIN</h3>
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
          <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block">Login</button>
        </form>
        </div>
      )
    }
  }
  export default Login;