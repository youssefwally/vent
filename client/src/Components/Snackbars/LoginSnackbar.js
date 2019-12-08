import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles, SnackbarContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";

const styles = {
  root: {
    justifyContent: "center",
    color: "#721c24",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderRadius: "15px"
  }
};

class TransitionsSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Transition: Fade
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          open={!this.props.auth}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            className={classes.root}
            message={<span id="message-id">Wrong Username or Password</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.props.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };
}

export default withStyles(styles)(TransitionsSnackbar);
