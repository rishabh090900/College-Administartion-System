import React, { Component } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
class ManageAttendance extends Component {
    constructor(props)
    {
   super(props)
  
   this.state = {
    subjname:localStorage.getItem("fcourse"),
 
    date:"",
    query: "",
    data: [],
    filteredData: [],
    data1: [],
    filteredData1: [],
    checkedItems: []  ,
    subjstud:[]
,
attendance:[]
  };
    }


    handle = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
          [name]: value
      });
      this.getData(value);
    }
    handle1 = (e) => {
      const value = e.target.value;
      this.setState({
         date: value
      });
      this.getData(value);
     this.filterarray();
    }
    handleChange=(e)=> {  
        
        var isChecked = e.target.checked;  
        var item = e.target.value;  
        if(isChecked){
        this.state.checkedItems.push(item) 
        console.log( this.state.checkedItems)
         }  }
  componentWillMount() {
    fetch("http://localhost:4000/api/attendance/"+localStorage.getItem("fcourse"))
      .then(res => res.json())
      .then(data => this.setState({ attendance: data }));
  }
  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData1 = prevState.data.subjstud.filter(element => {
        return element.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData1
      };
    });
  };
  getData = (e) => {
    const id=e
    console.log(id)
    axios.get("http://localhost:4000/api/attendance/"+localStorage.getItem("fcourse")+"/"+id)
         
    
      .then(data => {
        const { query } = this.state;
        const filteredData = data.data[0].attendence.filter(element => {
          return element.toUpperCase().includes(query.toLowerCase());
        });
        this.setState({
          data,
          filteredData
        });
      })
      fetch("http://localhost:4000/api/subject/"+localStorage.getItem("fcourse"))
          .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData1 = data.subjstud.filter(element => {
          return element.toUpperCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData1
        });
      });
  
  };
  delete=(e)=>{
    var item = e.target.value;
    console.log(item)
    var date=this.state.date
 console.log(date)
    axios.delete('http://localhost:4000/api/attendanced/'+localStorage.getItem("fcourse")+"/"+date+"/"+item)
    .then(console.log(item))

     }
     add=(e)=>{
      var item = e.target.value;
      console.log(item)
      var date=this.state.date
   console.log(date)
      axios.put('http://localhost:4000/api/attendanced/'+localStorage.getItem("fcourse")+"/"+date+"/"+item)
      .then(console.log(item))
  
       }
  
       filterarray=()=>{
        var arr=this.state.filteredData
        var arr1=this.state.filteredData1
        console.log(this.state.data1)
        var res = arr1.filter(item => arr.includes(item));
        console.log(res);
        }
  render() {
    if (localStorage.getItem("fcourse")!=null) {
      const Attendance = this.state.attendance.map(attendance => (
        <div 
       style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}} 
        key={attendance._id}>
            <Table striped bordered hover size="sm">

<tbody>
<tr style={{backgroundColor:"white"}}>

  <td style={{width:"30%"}}>{attendance.date}<button style={{marginLeft:"10px",borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={attendance.date} onClick={this.handle1}>update</button></td>

</tr>
</tbody>
</Table>

</div>
      ));
  const arr=this.state.filteredData
  const arr1=this.state.filteredData1
  const filteredItems = arr1.filter(item =>!arr.includes(item))
  console.log(filteredItems)
  const final= filteredItems.map(i => 
    <p style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}}> 
       <Table striped bordered hover size="sm">

<tbody>
<tr style={{backgroundColor:"white"}}>
<td style={{width:"30%"}}>

       {i}<button style={{marginLeft:"10px",borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={i} onClick={this.add}>mark present</button></td> 
          </tr>
</tbody>
</Table>
          </p>)
    return (
      <div>
              <div style={{width:"800px ", float:"left",marginTop:"100px",marginLeft:"50px",fontFamily:"serif",fontSize:"20px"}}>

<Table  striped bordered hover size="sm">

<thead style={{backgroundColor:"black", color:"whitesmoke"}}>

<tr>
<th style={{width:"30%"}}>Date</th>
</tr>
</thead></Table>
     {Attendance}
</div>

        <div className="searchForm" style={{width:"600px",borderRadius:"10px", marginLeft:"50px",  float:"left",marginTop:"100px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}}>
      
            <div 
       >  
            <h1>{localStorage.getItem("fcourse")}</h1>
            <h2>Update Attendance</h2>
      
        <form >
          <div className="form-group">
              <label style={{ float:"left"}} htmlFor="date">Enter date</label>
              <input type="date" className="form-control" required  
              name="date" placeholder="Enter date"
              value={this.state.date}
              onChange={this.handle}  />
          </div>
      <button value={this.state.date}
              onChange={this.handle}  onClick={console.log(this.state.date)}></button>
          {/* <input style={{width:"500px",borderRadius:"10px"}}
            placeholder="Search for Students"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
         */}
        </form>
        </div>
        <form onSubmit={this.handleSubmit}>
        <div>
            {this.state.filteredData.map(i => 
            <p style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}}> 
                 <Table striped bordered hover size="sm">
  
  <tbody>
    <tr style={{backgroundColor:"white"}}>
    <td style={{width:"30%"}}>

                 {i}<button style={{marginLeft:"10px",borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={i} onClick={this.delete}>mark absent</button></td> 
                    </tr>
  </tbody>
</Table>
                    </p>)}</div>
                    <div>

            {
            final
            
//             this.state.filteredData1.map(i => 
//               <p style={{fontFamily:"serif",fontSize:"20px" ,marginTop:"-15px"}}> 
//                  <Table striped bordered hover size="sm">
  
//   <tbody>
//     <tr style={{backgroundColor:"white"}}>
//     <td style={{width:"30%"}}>

//                  {i}<button style={{marginLeft:"10px",borderRadius:"10px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke"}} value={i} onClick={this.add}>mark present</button></td> 
//                     </tr>
//   </tbody>
// </Table>
//                     </p>)
                    
                    }</div>
                  </form>
      
      </div>
  </div>
    );}
  }
}
export default ManageAttendance;