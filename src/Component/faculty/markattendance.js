import React, { Component } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
class MarkAttendance extends Component {
    constructor(props)
    {
   super(props)
  
   this.state = {
    subjname:localStorage.getItem("fcourse"),
 
    date:"",
    query: "",
    data: [],
    filteredData: [],
    checkedItems: []  ,
    subjstud:[]

  };
    }
    handle = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
          [name]: value
      });
  }

    handleChange=(e)=> {  
        
        var isChecked = e.target.checked;  
        var item = e.target.value;  
        if(isChecked){
        this.state.checkedItems.push(item) 
        console.log( this.state.checkedItems)
         }  }

  handleSubmit=(e)=> {  
    console.log(this.state.checkedItems);
        
  const body={
    subjname:this.state.subjname,
   date:this.state.date,
    
       attendence:this.state.checkedItems
  
    } 
    
axios.post('http://localhost:4000/api/attendance',body)
.then(response => console.log(response.data))
this.setState({
  date:"",
    checkedItems: [] 
})
window.location.reload()   
    
  }  

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.subjstud.filter(element => {
        return element.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };
  getData = () => {
    fetch("http://localhost:4000/api/subject/"+localStorage.getItem("fcourse"))
          .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.subjstud.filter(element => {
          return element.toUpperCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };
  componentWillMount() {
    this.getData();
  }

  render() {
    if (localStorage.getItem("fcourse")!=null) {

    return (
        <div className="searchForm">
      
            <div 
        style={{width:"600px",borderRadius:"10px", marginTop:"50px", float:"left",marginTop:"100px",marginLeft:"600px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}}>  
            <h1>{localStorage.getItem("course")}</h1>
            <h2>Add Attendance</h2>
      
        <form >
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="date">Enter date</label>
              <input type="date" className="form-control" required  
              name="date" placeholder="Enter date"
              value={this.state.date}
              onChange={this.handle}  />
          </div>
      
          <input style={{width:"500px",borderRadius:"10px"}}
            placeholder="Search for Students"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        
        </form>
        </div>
        <form onSubmit={this.handleSubmit}>
        <div>
            {this.state.filteredData.map(i => 
            <p style={{fontFamily:"serif",fontSize:"20px" ,marginLeft:"600px",marginTop:"-15px"}}> 
                 <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    <td style={{width:"30%"}}>

                  <input  
                    type="checkbox"  
                    value={i}  
                    onChange={this.handleChange}  
                  /> {i}</td> 
                    </tr>
  </tbody>
</Table>
                    </p>)}</div>
                    <button type="submit" value="Submit" style={{backgroundColor:"black", color:"white",borderColor:"black" ,marginLeft:"600px",fontSize:"20px",width:"600px" }} className="btn btn-primary btn-block"  >Add Attendance</button> 
                  </form>
      
      </div>
  
    );}
  }
}
export default MarkAttendance;