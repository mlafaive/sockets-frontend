import React, { Component } from 'react';
import './Error404.css';

class Error404 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("Error404", props);
  }
  render() {
    return (
      <div className="error404">
       Error404
      </div>
    );
  }
}

export default Error404;