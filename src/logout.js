import React,{Component} from 'react'
import {Link } from 'react-router-dom'
class Logout extends Component {
 constructor(props){
     super(props)
     localStorage.removeItem("token")
     localStorage.removeItem("user")
     localStorage.removeItem("course")
     
 }
    render () {
        return (
        <div>


<h1>Logged out</h1>
      <Link to='/admin'>Login</Link>
        </div>);
    }
}
export default Logout