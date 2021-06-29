import React,{Component} from 'react'
import {Link } from 'react-router-dom'
class Logout extends Component {
 constructor(props){
     super(props)
     sessionStorage.removeItem("stoken")
     localStorage.removeItem("student")     
     localStorage.removeItem("studentr")     
 }
    render () {
        return (
        <div>


<h1>Logged out</h1>
      <Link to='/student'>Login</Link>
        </div>);
    }
}
export default Logout