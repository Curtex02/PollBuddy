import React, { Component } from "react";
import "./Question.scss";
import {
  MDBContainer,
  MDBIcon
} from "mdbreact";

import Countdown, { zeroPad } from "react-countdown";
import {Navigate} from "react-router-dom";

export default class Question extends Component {
  choiceOrder;
  questionStartTime;
  constructor(props) {
    super(props);
    //binding helper functions
    // this.deselectChoice = this.deselectChoice.bind(this);
    // this.selectChoice = this.selectChoice.bind(this);
    // this.getChoiceLabel = this.getChoiceLabel.bind(this);
    // this.onTimeEnd = this.onTimeEnd.bind(this);
    // this.submitAnswers = this.submitAnswers.bind(this);

    this.choiceOrder = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.questionStartTime = Date.now();
    let question = props.data.question;
    // this.shuffleArray(question.answers);
    this.state = {
      pollID: props.data.pollID,
      questionNumber: props.data.questionNumber,
      question: question,
      selectedAnswers: question.selectedAnswers || [],
    };
  }

  // deselectChoice(index) {
  //   if(!this.state.canChoose){
  //     return;
  //   }
  //   //set the boolean in the array at the selected index to false
  //   //remove it from the queue and update state
  //   let tempChoices = this.state.studentChoices;
  //   tempChoices[index] = false;
  //   //remove the index from teh queue
  //   for(let i = 0; i < this.state.choicesQueue.length; i++){
  //     if(this.state.choicesQueue[i] === index){
  //       this.state.choicesQueue.splice(i, 1);
  //       break;
  //     }
  //   }
  //   this.setState(prevState => ({
  //     ...prevState,
  //     studentChoices: tempChoices,
  //     // choicesQueue: tempQueue,
  //   }
  //   )
  //   );
  // }

  // selectChoice(index) {
  //   if(!this.state.canChoose){
  //     return;
  //   }
  //   let tempChoices = this.state.studentChoices;
  //   let count = 0;
  //   //push the index to the queue
  //   this.state.choicesQueue.push(index);
  //   //count the number of booleans that are true in the array
  //   for (let i = 0; i < this.state.studentChoices.length; i++) {
  //     if (this.state.studentChoices[i]) {
  //       count++;
  //     }
  //   }
  //   //if the number of true booleans is greater than the maximum number of
  //   //allowed choices (specified by the json) then pop from the queue to set the first
  //   //choice chosen back to false
  //   if (count >= this.state.data.MaxAllowedChoices) {
  //     this.state.studentChoices[this.state.choicesQueue.shift()] = false;
  //   }
  //   //make the boolean at the selected index true and update state
  //   tempChoices[index] = true;
  //   this.setState(prevState => ({
  //     ...prevState,
  //     studentChoices: tempChoices,
  //   }));
  // }

  //return the correct label to go in the choice bubble based on the index of the choice
  // getChoiceLabel(index){
  //   //if the index is between 0 and 25, simply return the proper letter
  //   if(index < this.choiceOrder.length){
  //     return this.choiceOrder[index];
  //   }
  //   //if the index is greater than 25, return a combination of letters (ex. AA, BB, etc)
  //   let repititions = Math.floor(index / 26) + 1;
  //   let charIndex = index % 26;
  //   let str = "";
  //   for(let i = 0; i < repititions; i++){
  //     str += this.choiceOrder[charIndex];
  //   }
  //   return str;
  // }

  // onTimeEnd(){
  //   this.state.canChoose = false;
  //   //TODO send answers to backend
  //   //TODO move on to next question (probably should be handled in a callback prop)
  // }

  // submitAnswers = () => {
  //   // Build submission
  //   // TODO: This will need to be formatted better in the future but it's fine for the demo
  //   let submission = { "Answers": [ { "QuestionNumber": 1} ]};
  //   console.log(this.state.studentChoices);
  //   console.log(this.state.choicesQueue);
  //   submission.Answers[0].Answer = this.state.data.AnswerChoices[this.state.choicesQueue[0]];
  //   console.log(submission);
  //
  //   // Submit
  //   fetch(process.env.REACT_APP_BACKEND_URL + "/polls/" + this.state.PollID + "/submit", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(submission)
  //   })
  //     .then(response => response.text())
  //     .then(response => {
  //       console.log("Server response to submission: " + response);
  //       this.setState({successfulSubmission: true});
  //     });
  // };
  isAnswerSelected = (answerID) => {
    let i = this.state.selectedAnswers.indexOf(answerID);
    return i >= 0;
  };

  selectAnswer = (answerID) => {
    let selectedAnswers = [...this.state.selectedAnswers];
    let i = selectedAnswers.indexOf(answerID);
    if (i >= 0) {
      selectedAnswers.splice(i, 1);
    } else {
      selectedAnswers.push(answerID);
      //TODO: Should be replaced with maxAllowedChoices
      if (selectedAnswers.length > this.state.question.maxAllowedChoices) {
        selectedAnswers.shift();
      }
    }
    this.setState({
      selectedAnswers: selectedAnswers,
    });
  };

  getSubmitData = () => {
    return {
      id: this.state.question.id,
      answers: this.state.selectedAnswers,
    };
  };

  submitQuestion = async () => {
    await fetch(process.env.REACT_APP_BACKEND_URL + "/polls/" + this.state.pollID + "/submitQuestion/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.getSubmitData())
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };

  render() {
    const clockFormat = ({ minutes, seconds, completed }) => {

      if (completed) {
        // Render a completed state
        return <span>Question closed!</span>;
      } else {
        // Render a countdown
        return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
      }
    };

    // if(this.state.successfulSubmission) {
    //   return (
    //     <Navigate to={"/polls/" + this.state.PollID + "/results"} push={true} />
    //   );
    // }

    return (
      <MDBContainer className="box">
        <p className="question-num">Question {this.state.questionNumber}</p>
        <span className={"question-title"}>{this.state.question.text}</span>
        { // only display image if there is one
          this.state.question.img &&
          <img
            className="question-img-fluid"
            src={this.state.data.img}
            alt={""}/>
        }
        <MDBContainer>
          {this.state.question.answers.map((answer, index) => {
            return (
              <btn className={"question-btn-and-text"} onClick={() => {
                this.selectAnswer(answer.id);
              }}>
                <MDBContainer
                  // className="question-label-bubble"
                  className={
                    this.isAnswerSelected(answer.id) ?
                      "question-label-bubble question-label-bubble-active" :
                      "question-label-bubble question-label-bubble-inactive"
                  }
                >
                  {this.choiceOrder[index]}
                </MDBContainer>
                {answer.text}
              </btn>
            );
            // if (this.state.studentChoices[index]) {
            //   return (
            //     <btn className={"question-btn-and-text"} onClick={() => {
            //       return this.deselectChoice(index);
            //     }}>
            //       <MDBContainer className="question-label-bubble question-label-bubble-active">
            //         {this.getChoiceLabel(index)}
            //       </MDBContainer>
            //       {choice}
            //     </btn>
            //   );
            // } else {
            //   return (
            //     <btn className={"question-btn-and-text"} onClick={() => {
            //       return this.selectChoice(index);
            //     }}>
            //       <MDBContainer className="question-label-bubble question-label-bubble-inactive">
            //         {this.getChoiceLabel(index)}
            //       </MDBContainer>
            //       {choice}
            //     </btn>
            //   );
            // }
          })}
        </MDBContainer>
        {/*<MDBContainer className="button time-info">*/}
        {/*  <MDBIcon far icon="clock" className="time-icon"/>*/}
        {/*  <Countdown*/}
        {/*    renderer={clockFormat}*/}
        {/*    date={this.questionStartTime + this.state.data.TimeLimit * 1000}*/}
        {/*    onComplete={this.onTimeEnd}*/}
        {/*  />*/}
        {/*</MDBContainer>*/}
        <MDBContainer>
          <button
            className="button"
            onClick={this.submitQuestion}
          >
            Submit
          </button>
        </MDBContainer>
      </MDBContainer>
    );
  }
}
