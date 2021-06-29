import React,{Component} from 'react'
import Navbar from './studentnav'
import {  Redirect } from 'react-router-dom'
import axios from 'axios'
class Student extends Component {
 
 
 constructor(props)
 {
super(props)
const token=sessionStorage.getItem("stoken")
let loggedIn=true
if(token==null){
    loggedIn=false
}
this.state={
    loggedIn
}
 }
 fetchuserdetail=(user_id)=>{
    console.log(user_id)
    axios.get("http://localhost:4000/api/ssearch/"+user_id
    )
    .then(res => {localStorage.setItem("studentr",res.data.results[0].rollno)}
)
    
}
    
componentDidMount() {
this.fetchuserdetail(localStorage.getItem("student"))
}
    render () {
        if(this.state.loggedIn===false){
           return <Redirect to='/studentlogin'/>
        }
        return (
        <div>
               
    <Navbar/>;
    </div>);
    }}
    export default Student;