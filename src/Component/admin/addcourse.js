import React,{Component} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {  Redirect } from 'react-router-dom'
class Addsubject extends Component {
 
 
    constructor(props)
    {
   super(props)
   const token=sessionStorage.getItem("token")
   let loggedIn=true
   if(token==null){
       loggedIn=false
   }
   this.state={
    subjcode:'',
    subjname:'',
    subjfac:'',
    subjfacemail:'',
    subjdesc:''
   ,
    subject:[],
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
            subjcode:this.state.subjcode,
            subjname:this.state.subjname,
            subjfac:this.state.subjfac,
            subjfacemail:this.state.subjfacemail,
            subjdesc:this.state.subjdesc  
        }
    axios.post('http://localhost:4000/api/subject',body1)
    .then(response => console.log(response.data))
    this.setState({
        subjcode:'',
        subjname:'',
        subjfac:'',
        subjfacemail:''
        ,subjdesc:''
    
    })
    window.location.reload()   
}
componentWillMount() {
    fetch("http://localhost:4000/api/subject")
      .then(res => res.json())
      .then(data => this.setState({ subject: data }));
  }

       render () {
           if(this.state.loggedIn===false){
              return <Redirect to='/adminlogin'/>
           }
           const Subject = this.state.subject.map(Subject => (
            <div 
           style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
            key={Subject.id}>
                <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    
      <td style={{width:"30%"}}>{Subject.subjcode}</td>
      <td style={{width:"30%"}}>{Subject.subjname}</td>
      <td style={{width:"40%"}}>{Subject.subjfac}</td>
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
          <h3>ADD Subject</h3>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="name">Enter Subject Code</label>
              <input type="text" className="form-control" required  
              name="subjcode" placeholder="Enter Subject Code"
              value={this.state.subjcode}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="rollno">Enter Subject Name</label>
              <input type="text" className="form-control" required  
              name="subjname" placeholder="Enter Subject Name"
              value={this.state.subjname}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="email">Enter Subject Faculty</label>
              <input type="text" className="form-control" required  
              name="subjfac" placeholder="Enter Faculty Name"
              value={this.state.subjfac}
              onChange={this.handle}  />
          </div>
          <div className="form-group">
          <label style={{ float:"left"}}>Enter Faculty Email</label>
              <input type="text" className="form-control" 
              name="subjfacemail" placeholder="Enter Faculty Email"
              value={this.state.subjfacemail}
              onChange={this.handle}  />
          </div>

          <div className="form-group">
          <label style={{ float:"left"}}>Course Description</label>
              <input type="text" className="form-control" 
              name="subjdesc" placeholder="Enter Course Description in 50-200 words"
              value={this.state.subjdesc}
              onChange={this.handle}  />
          </div>
        <button type="submit" value="submit" style={{backgroundColor:"white", color:"black",borderColor:"white",fontSize:"20px" }} className="btn btn-primary btn-block"  >Add Subject</button>
      </form>
      <div style={{width:"800px ",float:"left",marginTop:"50px",marginLeft:"130px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>
<th style={{width:"30%"}}>Subject Code</th>
<th style={{width:"30%"}}>Subject Name</th>
<th style={{width:"40%"}}>Subject Faculty</th>
</tr>
</thead></Table>
     {Subject}
</div>
      </div>
   )}}
        export default Addsubject