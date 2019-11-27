import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  textField: {
    marginBottom: '20px',
    minWidth: 300,
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

class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {classes} = this.props;
    return (
      <TextField
        label="Email"
        className={classes.textField}
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        onChange={this.props.callBack}
        fullWidth={true}
        error={this.props.isEmpty}
        helperText={this.props.isEmpty? "Please enter your email!" : ""}
      />
    );
  }
}

export default withStyles(styles)(OutlinedTextFields);
