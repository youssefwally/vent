import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Register from "./Register";

export default function SimpleContainer() {
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div">
            <Register />
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
