import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Username from "../Components/TextFields/Username";
import Password from "../Components/TextFields/Password";
import LoginButton from "../Components/Buttons/LoginButton";
import { withStyles } from "@material-ui/core/styles";
import axios from "../axiosInstance";
import SnackBar from "../Components/Snackbars/LoginSnackbar";
import Logo from "../Images/vent.jpg";
import {withRouter} from 'react-router-dom'

const styles = {
  header: {
    textAlign: "center",
    fontFamily: "sans-serif"
  },
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
};

class SimpleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
    
      },
      isEmptyEmail: false,
      isEmptyPass: false,
      auth: true
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <React.Fragment>
            <Container maxWidth="sm" className={classes.container}>
              <div className={classes.info}>
                <Typography variant="h4" className={classes.header}>
                  <img
                    style={{ width: "50px", marginRight: "10px" }}
                    src={Logo}
                  />
                  {sessionStorage.getItem("language") === 'ar'? "تسجيل دخول" : "Login"}
                </Typography>
                <Username
                  isEmpty={this.state.isEmptyEmail}
                  callBack={this.handleChange}
                />
                <Password
                  isEmpty={this.state.isEmptyPass}
                  callBack={this.handlePassword}
                />
              </div>
              <LoginButton callBack={this.handleLogin}/>
            </Container>
          </React.Fragment>
        </div>
        <SnackBar auth={this.state.auth} handleClose={this.handleClose} />
      </div>
    );
  }

  handleChange = e => {
    let newValue = e.target.value;
    let name = e.target.name;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [name]: newValue
        },
        isEmptyEmail: false,
        isEmptyPass: prevState.isEmptyPass,
        auth: prevState.auth
      };
    });
  };

  handlePassword = e => {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [name]: newValue
        },
        isEmptyEmail: prevState.isEmptyEmail,
        isEmptyPass: false,
        auth: prevState.auth
      };
    });
  };

  handleLogin = (e) => {
    const email = this.state.data.email;
    const password = this.state.data.password;
    if (email === "") {
      this.setState(prevState => {
        return {
          data: {
            ...prevState.data
          },
          isEmptyEmail: true,
          isEmptyPass: prevState.isEmptyPass,
          auth: prevState.auth
        };
      });
    }
    if (password === "") {
      this.setState(prevState => {
        return {
          data: {
            ...prevState.data
          },
          isEmptyEmail: prevState.isEmptyEmail,
          isEmptyPass: true,
          auth: prevState.auth
        };
      });
    }
    if (email !== "" && password !== "") {
      const info = this.state.data;

      fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        res.json().then((data) => {

            if (res.status !== 200) {
                        this.catchError(res);
                      } else {
                        if (data.auth==true) {
                            console.log("555555555");
                          sessionStorage.setItem("token", data.token);
                          sessionStorage.setItem("auth", data.auth);
                          sessionStorage.setItem("id", data.id);
                          document.location.href = "/";
                          
                        }
                      }
                    })
      })
   
        .catch(this.catchError);
    }
  };

  catchError = error => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data
        },
        isEmptyEmail: prevState.isEmptyEmail,
        isEmptyPass: prevState.isEmptyPass,
        auth: false
      };
    });
  };

  handleClose = () => {
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data
        },
        isEmptyEmail: prevState.isEmptyEmail,
        isEmptyPass: prevState.isEmptyPass,
        auth: true
      };
    });
  };
}

export default withStyles(styles)(withRouter(SimpleContainer));
