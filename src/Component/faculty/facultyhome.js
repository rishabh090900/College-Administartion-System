import React,{Component} from 'react'

import Navbar from './facultynav'
import {  Redirect } from 'react-router-dom'
class Faculty extends Component {
 
 
 constructor(props)
 {
super(props)
const token=sessionStorage.getItem("ftoken")
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
           return <Redirect to='/facultylogin'/>
        }
        return (
        <div>
               
        <Navbar/>;
    </div>);
    }}
    export default Faculty;