import React from "react";
import clsx from "clsx";
import {  withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {},
  textField: {
    flexBasis: 200,
    '& label.Mui-focused': {
      color: '#bb3371',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#bb3371',
    },
    '& .MuiOutlinedInput-root': { 
      '&.Mui-focused fieldset': {
        borderColor: '#bb3371',
      },
    },
  }
};

class OutlinedInputAdornments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false
      }
    };
  }

  handleClickShowPassword = () => {
    this.setState(prevState => {
      return {
        info: {
          ...prevState.info,
          showPassword: !prevState.info.showPassword
        }
      };
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <TextField
        id="outlined-adornment-password"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        type={this.state.info.showPassword ? "text" : "password"}
        label="Password"
        name="password"
        fullWidth={true}
        onChange={this.props.callBack}
        error={this.props.isEmpty}
        helperText={this.props.isEmpty? "Please enter your password!" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {this.state.info.showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
}

export default withStyles(styles)(OutlinedInputAdornments);
