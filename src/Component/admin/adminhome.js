import React,{Component} from 'react'

import Navbar from './adminnav'
import { Redirect } from 'react-router-dom'
class Admin extends Component {
 
 
 constructor(props)
 {
super(props)
const token=sessionStorage.getItem("token")
let loggedIn=true
if(token==null){
    loggedIn=false
}
this.state={
    loggedIn
}
 }
 
    render () {
        if(this.state.loggedIn===false){
           return <Redirect to='/adminlogin'/>
        }
        return (
        <div>
               
        <Navbar/>;
    </div>);
    }}
    export default Admin;