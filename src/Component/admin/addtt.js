import React, { Component } from 'react';
import axios from 'axios';

export default class TT extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Year:'',
            img: ''
        }
    }

    onFileChange(e) {
        this.setState({ img: e.target.files[0] })
    }
    handle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
    
        // Update the formData object
        formData.append(
            this.state.Year
        
          ,this.state.img
          );
          axios.post("http://localhost:4000/api/timetable", formData, {
        }).then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div   style={{width:"600px",borderRadius:"10px", marginTop:"150px", float:"left",marginLeft:"600px",fontFamily:"serif",fontSize:"20px",backgroundColor:"rgb(0,0,0)",color:"whitesmoke", padding:"20px"}} className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                     <label style={{ float:"left"}}>Enter Year</label>
                  <input type="text" className="form-control" 
                name="Year" placeholder="Enter Year"
                value={this.state.Year}
                    onChange={this.handle}  />
                        </div>
 
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}