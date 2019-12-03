import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Col from "react-bootstrap/Col";
import avatar from "../Images/AccountIcon2.png";
import ListGroup from "react-bootstrap/ListGroup";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const useStyles2 = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: useStyles,
      classes2: useStyles2,
      problemBox:"",
      newEmail: "",
      emailTextbox: "",
      passwordTextbox: "",
      newPassword:"",
      problems:[],
      selectedProblem:"",
      listItems:"",
      token: sessionStorage.getItem("token")
    };
  }


  componentDidMount () {
    {
      fetch('http://localhost:3000/api/problem/vProblem', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

        .then(res => res.json())
        .then(json => {
          
            
          
            this.setState({ 
              problems: json.data
            })
          
        })
    }
    
  }


  registerEmail = () => {
    
    fetch("http://localhost:3000/api/user/changeEmail", {
      method: 'PUT',
      body: JSON.stringify({email:this.state.newEmail}),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": this.state.token
      })
    })
      .then(res => {
        res.json().then(data => {
          if (res.status !== 200) {
            this.catchError(res);
          } else {
            sessionStorage.setItem("email", data.email);

           window.location.reload();
          }
        });
      })

      .catch(this.catchError);
  };


  registerPassword = () => {
    
    fetch("http://localhost:3000/api/user/changePassword", {
      method: 'PUT',
      body: JSON.stringify({password:this.state.newPassword}),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": this.state.token
      })
    })
      .then(res => {
        res.json().then(data => {
          if (res.status !== 200) {
            this.catchError(res);
          } else {
            sessionStorage.setItem("password", data.password);

           window.location.reload();
          }
        });
      })

      .catch(this.catchError);
  };


  handleTheProblem=()=>{


  

  //this.setState({problemBox:x})
}
  
  handleEmail = () => {
    const x = (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="success" onClick={this.registerEmail}>
            Accept
          </Button>
          <Button variant="danger" onClick={this.removeItem}>
            Cancel
          </Button>
        </InputGroup.Prepend>
        <FormControl
          aria-describedby="basic-addon1"
          className="nee"
          onChange={this.handleChange("newEmail")}
        />
      </InputGroup>
    );

    this.setState({ emailTextbox: x });
  };
  handlePassword = () => {
    const x= (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="success" onClick={this.registerPassword}>
            Accept
          </Button>
          <Button variant="danger" onClick={this.removePassItem}>
            Cancel
          </Button>
        </InputGroup.Prepend>
        <FormControl
          aria-describedby="basic-addon1"
          className="nee"
          onChange={this.handleChange("newPassword")}
        />
      </InputGroup>
    );

    this.setState({ passwordTextbox: x });
  };


  removeItem = () => {
    this.setState({ emailTextbox: "" });
  };
  removePassItem = () => {
    this.setState({ passwordTextbox: "" });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  handlePair=()=>{
    var paired=sessionStorage.getItem("paired")

    if(paired==="yes"){
      paired="No";
    }else{
      paired="yes";
    }
    fetch("http://localhost:3000/api/user/changePair", {
      method: 'PUT',
      body: JSON.stringify({paired:paired}),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": this.state.token
      })
    })
      .then(res => {
        res.json().then(data => {
          if (res.status !== 200) {
            this.catchError(res);
          } else {
            sessionStorage.setItem("paired", data.paired);

           window.location.reload();
          }
        });
      })

      .catch(this.catchError);

  }

  render() {
    console.log(this.state.newEmail);
   
    // this.setState(this.state.problems.map((item, i) => (
    //   <div>
    // <Dropdown.Item onClick={()=>{this.setState({selectedProblem:item.problemType})}}>{item.problemType}</Dropdown.Item>
    
    //   </div>
  
    //       ))
    // )
    return (
      <div style={{ justifyContent: "center" }}>
        <div style={{ justifyContent: "center" }}>
          <div>
            <Form>
              <Form.Group>
                <img
                  style={{ width: "250px", marginRight: "10px" }}
                  src={avatar}
                />
              </Form.Group>

              <Form.Group style={{ marginTop: "30px" }}>
                <Col sm={2}>
                  <ListGroup.Item variant="primary">Email</ListGroup.Item>
                  <ListGroup horizontal>
                    <ListGroup.Item variant="light">
                      {sessionStorage.getItem("email")}
                    </ListGroup.Item>
                    <Container>
                      {" "}
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        style={{ left: "70%" }}
                        onClick={this.handleEmail}
                      >
                        <EditIcon />
                      </Fab>
                    </Container>
                  </ListGroup>
                </Col>
              </Form.Group>
            </Form>
            <Container style={{ left: "200px" }}>
              {this.state.emailTextbox}
            </Container>
            <Form>
              <Form.Group style={{ marginTop: "30px" }}>
                <Col sm={2}>
                  <ListGroup.Item variant="primary">Password</ListGroup.Item>
                  <ListGroup horizontal>
                    <ListGroup.Item variant="light">
                      ************
                    </ListGroup.Item>
                    <Container style={{ marginLeft: "20%" }}>
                      {" "}
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        style={{ left: "70%" }}
                        onClick={this.handlePassword}
                      >
                        <EditIcon />
                      </Fab>
                    </Container>
                  </ListGroup>
                </Col>
              </Form.Group>
            </Form>
            <Container style={{ left: "200px" }}>
              {this.state.passwordTextbox}
            </Container>

            <Form>
              <Form.Group style={{ marginTop: "30px" }}>
                <Col sm={2}>
                  <ListGroup.Item variant="primary">Problem</ListGroup.Item>
                  <ListGroup horizontal>
                    <ListGroup.Item variant="light">
                      {sessionStorage.getItem("problemo")}
                    </ListGroup.Item>
                    <Container style={{ marginLeft: "20%" }}>
                      {" "}
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        style={{ left: "70%" }}
                        onClick={this.handleTheProblem}
                      >
                        <EditIcon />
                      </Fab>
                    </Container>
                  </ListGroup>
                </Col>
              </Form.Group>
            </Form>

            <Form>
              <Form.Group style={{ marginTop: "30px" }}>
                <Col sm={2}>
                  <ListGroup.Item variant="primary">Paired</ListGroup.Item>
                  <ListGroup horizontal>
                    <ListGroup.Item variant="light">
                      {sessionStorage.getItem("paired")}
                    </ListGroup.Item>
                    <Container style={{ marginLeft: "20%" }}>
                      {" "}
                      <Fab
                        color="secondary"
                        aria-label="edit"
                        style={{ left: "70%" }}
                        onClick={this.handlePair}
                      >
                        <EditIcon />
                      </Fab>
                    </Container>
                  </ListGroup>
                </Col>
              </Form.Group>
            </Form>

            <br />
          </div>
        </div>
      </div>
    );
  }
}
