import React, { Component } from 'react';
import { Draw } from './drawing/draw';

class App extends Component {

  render() {
    return (
      <>
        <h1>Mock Shapes Demo</h1>
        <Draw />
      </>
    );
  }
}

export default App;