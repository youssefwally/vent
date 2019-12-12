import React, { Component } from "react";
import { Container } from "@material-ui/core";
import Card from "react-bootstrap/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
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

export default class HomePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dude: [],
      test: ["hi", "hi2", "hi3"],
      classes: useStyles
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/api/problem/sProblemView", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-access-token": this.state.token
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          dude: json.data
        });
        console.log(this.state.dude);
      })

      .catch(this.catchError);
  };

  render() {
    const { classes } = this.state.classes;
    const listItems = this.state.test.map((item, i) => (
      <div className={this.state.classes.root}>
        <div className={this.state.classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Container maxWidth="xl">
                <br />
                <Card
                  height="4vw"
                  style={{ marginTop: "8px", width: "400%" }}
                  bg="primary"
                  text="white"
                >
                  <Card.Header>Header</Card.Header>
                  <Card.Body>
                    <Card.Title>{item.email}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>
            </Grid>
          </Grid>
        </div>
      </div>
    ));

    return <>{listItems}</>;
  }
}
