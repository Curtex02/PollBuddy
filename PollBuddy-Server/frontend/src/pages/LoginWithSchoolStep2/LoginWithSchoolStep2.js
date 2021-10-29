import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import ErrorText from "../../components/ErrorText/ErrorText";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

export default class LoginWithSchoolStep2 extends Component {
  constructor(props) {
    super(props);

    // Process args
    if(this.props.location.search) {
      console.log("Getting things");

      var result = new URLSearchParams(this.props.location.search).get("result");
      var data = JSON.parse(new URLSearchParams(this.props.location.search).get("data"));
      var error = JSON.parse(new URLSearchParams(this.props.location.search).get("error"));

    }

    // Set up the state
    this.state = {
      result: result,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      error: error,
      doneLoading: true,
    };
  }

  componentDidMount() {
    this.props.updateTitle("Login With School Step 2");
  }

  render() {
    if (this.state.result === "failure") {
      alert("Error: " + this.state.error + " Please try again.");
      if(this.state.error === "User is not registered"){
        console.log("Error: " + this.state.error);
        // Redirect to register page
        return <Redirect to="/register/school" push={true}/>;
      } else if(this.state.error === "User has not logged in with RPI."){
        console.log("Error: " + this.state.error);
        // Redirect to login page
        return <Redirect to="/login/school" push={true}/>;
      } else { //database error - show the ErrorText component
        return ( //for some reason, this only shows up after clicking submit twice
          <ErrorText text={this.state.error}> </ErrorText>
        );
      }
    } else if(!this.state.doneLoading){
      return (
        <MDBContainer className="page">
          <LoadingWheel/>
        </MDBContainer>
      );
    } else {
      // Save data about the user
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("firstName", this.state.firstName);
      localStorage.setItem("lastName", this.state.lastName);
      localStorage.setItem("userName", this.state.userName);

      console.log("everything worked; redirecting to /groups");
      return <Redirect to="/groups" push={true}/>;

      //technically we'll never get here, but this makes react happy
      return (
        <p>Logging in...</p>
      );
    }
  }
}
