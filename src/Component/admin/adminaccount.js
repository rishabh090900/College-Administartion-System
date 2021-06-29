import React,{Component} from 'react'
import axios from 'axios'
import {  Redirect } from 'react-router-dom'
class AdminA extends Component {
 
 
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
       user_id:localStorage.getItem("user")
   , usertype:'',
    username:'',
    email: '',
    password:'',
    loggedIn,
    show: false

   }
   }
   showModal = e => {
    this.setState({
      show: true
    });
  
    }
    fetchuserdetail=(user_id)=>{
        console.log(user_id)
        axios.get("http://localhost:4000/api/search/"+user_id
        )
        .then(response=>this.setState({ 
            id:response.data.results[0]._id,
            usertype:response.data.results[0].usertype,

  username:response.data.results[0].username,
  email: user_id

}))
        
    }
        
    componentDidMount(){
        this.fetchuserdetail(this.state.user_id)
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
    axios.put('http://localhost:4000/api/addadmin/'+this.state.id,body1)
    .then(response => console.log(response.data))
    this.setState({
      
        username:'',
     
        email: '',
        password: ''
    })   
    window.location.reload()   
    }
    renderform(show) {
        if (show != false)
        return(
            
            <form 
    style={{width:"600px",borderRadius:"10px",  marginTop:"450px", marginLeft:"600px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}} 
      action="" method="post" onSubmit={this.submit}>
          <h3>Update Details</h3>
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
        <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block">Update</button>
      </form>
  
        );
        }

       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           
           return (
            <div>
<div
    style={{width:"600px",borderRadius:"10px", marginTop:"150px", float:"left",marginLeft:"600px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}} 
    >
        <h1>{this.state.usertype}</h1>
        <h1>{this.state.username}</h1>
        <h1>{this.state.email}</h1>
        <button  style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block" onClick={e => {
              this.showModal();
         }}
          > Update Details </button>
          
        </div>  
        {this.renderform(this.state.show)}
</div>
       )
      



    }}
        export default AdminA