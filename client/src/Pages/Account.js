import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Col from 'react-bootstrap/Col'
import avatar from '../Images/AccountIcon2.png'
import ListGroup from 'react-bootstrap/ListGroup'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));
  

  const useStyles2 = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  


export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
           classes : useStyles,
           classes2:useStyles2 
          
          
        };
      
      }



    render() {


        return (
            <div>
               <Paper className={this.state.classes}>
               <Col xs={6} md={4}>
               <img
                    style={{ width: "250px", marginRight: "10px" }}
                    src={avatar}
                  />
    </Col> 
    <ListGroup><Col xs={6} md={4}>
    
    <ListGroup.Item active>Email:</ListGroup.Item>
    <Grid container className={this.state.useStyles2} spacing={0}>
    
  <ListGroup.Item xs={1} md={2}>
  {sessionStorage.getItem("email")}</ListGroup.Item>
  <Fab color="secondary" aria-label="edit" style={{left:"100px"}}>
  <EditIcon />
</Fab> 
 
</Grid>  

  <ListGroup.Item active>Password:</ListGroup.Item>
  <Grid container className={this.state.useStyles2} spacing={0}>
  <ListGroup.Item>********</ListGroup.Item>
  <Fab color="secondary" aria-label="edit" style={{left:"170px"}}>
  <EditIcon />
</Fab> 
</Grid>
  <ListGroup.Item active>Problem:</ListGroup.Item>
  <Grid container className={this.state.useStyles2} spacing={0}>
  <ListGroup.Item >N/A </ListGroup.Item>
  <Fab color="secondary" aria-label="edit" style={{marginLeft:"170px"}}>
  <EditIcon />
</Fab> 
</Grid>
  <ListGroup.Item active>Paired:</ListGroup.Item>
  <Grid container className={this.state.useStyles2} spacing={0}>
  <ListGroup.Item >N/A </ListGroup.Item>
  <Fab color="secondary" aria-label="edit" style={{marginLeft:"150px"}}>
  <EditIcon />
</Fab> 

</Grid>
  </Col>
   
</ListGroup>

    </Paper>
            </div>
        )
    }
}
