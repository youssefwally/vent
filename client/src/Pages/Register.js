import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";

const styles = {
  root: {
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#43A047",
    borderColor: "#f5c6cb"
  }
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      problems:[],
      isLoaded:false,
      selectedProblem:""
    
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
          if (json.data.length === 0) {
            alert('No Problems Found')
          } else {
            this.setState({ isLoaded:true,
              problems: json.data
            })
          }
        })
    }
    
  }


 

  handleClose = () => {
    this.setState({
      open: false
    });
  };


  handleProblem=()=>{

  }

  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 0 ? null : "Please enter your email "
    });
  };

  validatePassword = () => {
    const { password } = this.state;
    this.setState({
      passwordError:
        password.length > 0 ? null : "Please enter your password "
    });
  };

  

  handleInput = name => e => {
    this.setState({ [name]: e.target.value });
  };

  reload = () => {
    window.location.reload();
  };

  handleCreate = () => {
    const ProductInfo = {
      email: this.state.email,
      password: this.state.nameInArabic,
      description: this.state.descriptionInEnglish,
     
    };

    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 0 ? null : "Please enter your email "
    });

    const { password } = this.state;
    this.setState({
      passwordError:
        password.length > 0 ? null : "Please enter your password "
    });

   

    if (
      email.length > 0 &&
      password.length > 0
     
    ) {

        fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password:this.state.password,
                problemType:this.state.selectedProblem
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
            res.json().then((data) => {
    
                if (res.status !== 200) {
                            this.catchError(res);
                          } else {
                    
                          this.setState({open:true})
                          setTimeout(document.location.href="/login",4000 );      
                          }
                        })
          })

    }
  };

  render() {
    const { classes } = this.props;
    var { isLoaded } = this.state;
    const listItems = this.state.problems.map((item, i) => (
    <div>
  <Dropdown.Item onClick={()=>{this.setState({selectedProblem:item.problemType})}}>{item.problemType}</Dropdown.Item>
  
    </div>

        ))
      
    return (
        
        <div style={{ justifyContent: "center" }}>
{!isLoaded ? (
          <div
            style={{
              textAlign: "center",
              minHeight: "100vh",
              paddingLeft: "20px",
              paddingTop: "300px"
            }}
          >
            <Spinner animation="grow" variant="primary" />{" "}
            <Spinner animation="grow" variant="primary" />{" "}
            <Spinner animation="grow" variant="primary" />
          </div>
        ) : (

      <div>
        <h1 style={{"marginTop":"20px"}}>Create Your Account</h1>
        <br />
     
       
        <Form>
          <Form.Group controlId="englishName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="example@gmail.com"
              onChange={this.handleInput("email")}
              onBlur={this.validateEmail}
              className={`form-control ${
                this.state.emailError ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {this.state.emailError}
            </div>
          </Form.Group>
          <Form.Group controlId="arabicName">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handleInput("password")}
              onBlur={this.validatePassword}
              className={`form-control ${
                this.state.passwordError ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{this.state.nameErrorArabic}</div>
          </Form.Group>
          <Form.Group controlId="englishDesc" style={{"marginTop":"30px"}}>
          <DropdownButton id="dropdown-basic-button" title="Problem Type" variant="secondary">
  
  {listItems}
</DropdownButton>
          </Form.Group>
          

          <Form.Group style={{"marginLeft":"450px"}}>
            
            <div className="invalid-feedback">{this.state.pointsError}</div>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "50px" }}
              onClick={this.handleCreate}
            >
              Create
            </Button>
          </Form.Group>
        </Form>

        <Snackbar
          open={this.state.open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          autoHideDuration={2000}
        >
          <SnackbarContent
            style={{
              background: "linear-gradient(to right,  #a10073, #ff0051"
            }}
            message={
              this.state.upload ? "Photo Uploaded" : "Registration Complete"
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>

        <br />
      </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Register);
