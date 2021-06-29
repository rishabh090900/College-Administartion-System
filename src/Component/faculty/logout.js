import React,{Component} from 'react'
import {Link } from 'react-router-dom'
class Logout extends Component {
 constructor(props){
     super(props)
     sessionStorage.removeItem("ftoken")
     localStorage.removeItem("faculty")     
 }
    render () {
        return (
        <div>


<h1>Logged out</h1>
      <Link to='/faculty'>Login</Link>
        </div>);
    }
}
export default Logout