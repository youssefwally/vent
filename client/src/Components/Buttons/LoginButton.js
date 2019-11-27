import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";

const styles = {
  
};

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.login}
          style={{
            background: "linear-gradient(to right, #a10073, #ff0051)",
            marginTop: "10px",
            borderRadius: "50px"
          }}
          onClick={this.props.callBack}
        >
          {sessionStorage.getItem("language") === "ar" ? "تسجيل دخول" : "Login"}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LoginButton);
