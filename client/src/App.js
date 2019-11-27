import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       classes : useStyles
    };
    
  }

   

render(){
 // const classes = useStyles();
  return (
  
    <div>
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={this.state.classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={this.state.classes.title}>
      Vent
    </Typography>
    <Button color="inherit" style={{"margin-left":"90%"}} >Login</Button>
  </Toolbar>
</AppBar>
    

    <Router>
            <React.Fragment>
              <Route
                exact
                path="/login"
                render={() => (
                  <>
                    <p>Login PAge</p>
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