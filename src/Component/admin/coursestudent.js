// import React, { Component } from 'react';
// class CourseStudent extends Component {

// render() {
//     if (localStorage.getItem("course")!=null) {
//     return (
//     <div className="container">
//     <div className="row" style={{margin:"500px"}}>
//     {localStorage.getItem("course")}
//     </div>
//     </div>
//     );
//     } else {
//     return (<div></div>);
//     }
//     }
//    }
//    export default CourseStudent;
   import React, { Component } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
class CourseStudent extends Component {
    constructor(props)
    {
   super(props)
  
   this.state = {
    query: "",
    data: [],
    filteredData: [],
    checkedItems: []  ,
    subjstud:[]

  };
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
       subjstud:this.state.checkedItems
  
    } 
    
axios.put('http://localhost:4000/api/subject/'+localStorage.getItem("course"),body)
.then(response => console.log(response.data))
this.setState({
    checkedItems: [] 
})

 
  }  

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.rollno.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
    fetch(`http://localhost:4000/api/addstudent`)
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.rollno.toUpperCase().includes(query.toLowerCase());
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
    if (localStorage.getItem("course")!=null) {
        
    return (
        <div className="searchForm">
            <div 
        style={{width:"600px",borderRadius:"10px", marginTop:"50px", float:"left",marginTop:"100px",marginLeft:"600px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}}>  
            <h1>{localStorage.getItem("course")}</h1>
            
        <form >
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
                    value={i.rollno}  
                    onChange={this.handleChange}  
                  /> {i.rollno}</td> <td style={{width:"30%"}}>{i.name}</td>
                    </tr>
  </tbody>
</Table>
                    </p>)}</div>
                    <button type="submit" value="Submit" style={{backgroundColor:"black", color:"white",borderColor:"black" ,marginLeft:"600px",fontSize:"20px",width:"600px" }} className="btn btn-primary btn-block"  >Add Student</button> 
                  </form>
      
      </div>
  
    );}
  }
}
export default CourseStudent;