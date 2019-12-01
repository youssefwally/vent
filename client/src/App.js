import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import LoginPage from "./Pages/Login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Account from "./Pages/Account";
import Register from "./Pages/RegisterPageContainer";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: useStyles,
      open: false,
      menu: ""
    };
  }

  home = () => {
    document.location.href = "/";
  };

  handleMenu = e => {
    this.state.open == true
      ? this.setState({ open: false })
      : this.setState({ open: true });
  };

  logout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("auth", false);
    document.location.href = "/Login";
  };

  closeMenu = () => {
    this.setState({ menu: null });
  };

  login = () => {
    document.location.href = "/login";
  };

  goToProfile = () => {
    document.location.href = "/account";
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              onClick={this.home}
              className={this.state.classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={this.state.classes.title}>
              Vent
            </Typography>
            {sessionStorage.getItem("token") == "" ? (
              <Button
                color="inherit"
                style={{ "margin-left": "90%" }}
                onClick={this.login}
              >
                Login
              </Button>
            ) : (
              <Button color="inherit" style={{ "margin-left": "90%" }}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={this.state.open}
                  onBlur={() => this.setState({ open: false })}
                >
                  <MenuItem onClick={this.goToProfile}>Profile</MenuItem>
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Router>
          <React.Fragment>
            <Route
              exact
              path="/login"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    (document.location.href = "/")
                  ) : (
                    <LoginPage />
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/account"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    <Account />
                  ) : (
                    (document.location.href = "/login")
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/register"
              render={() => (
                <>
                  {sessionStorage.getItem("token") === "" ? (
                    <Register />
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
