import React, { Component } from 'react';
import Router from './components/router/Router';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Router />
        </Grid>
      </div>
    );
  }
}

export default App;
