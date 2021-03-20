import React, { Component } from "react";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer } from "mdbreact";

export default class GroupJoin extends Component {//this class will likely need to call Groups/new and do more with that...
  componentDidMount(){
    this.props.updateTitle("Group Join");
  }

  constructor() {
    super();
    //TODO check if they're logged in
    console.log(localStorage.getItem("loggedIn"));
    if (localStorage.getItem("loggedIn") == "true") {
      console.log("Logged in");
    } else {
      console.log("Not logged in");
      // window.location.replace("/login");
    }
    this.state = {
      groupCode: "",
      showConfirm: false
    };
  }

  handleClick = () => {
    // var response = window.confirm("Are you sure you want to join this group?");
    // if (response === true) {
    //   window.location.replace("/groups/" + this.state.groupCode + "/polls");
    // } else {
    //   window.location.replace("/groups");
    // }
    this.setState({showConfirm: true});
    console.log("hi")
  }

  handleChange = (e) => {
    this.setState({groupCode: e.target.value});
  }

  render() {
    //TODO check if they're logged in
    return (
      <MDBContainer className="page">
        <MDBContainer fluid className="box">
          { this.state.showConfirm
            ?
            <MDBContainer className="form-group">
              <p>Are you sure you want to join this group?</p>
              <button className="button">Yes</button>
              <button className="button">No</button>
            </MDBContainer>
            :
            <MDBContainer className="form-group">
              <label>Please enter your group code:</label>
              <input className="form-control textBox" type="text" name="groupCode" onChange={this.handleChange}/>
              <input onClick={this.handleClick} className="btn button float-right" type="submit" value="OK"/>
            </MDBContainer>
          }
        </MDBContainer>
      </MDBContainer>
    );
  }
}
