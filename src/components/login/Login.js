import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("login", props);
  }
  render() {
    return (
      <div className="login">
       Login
      </div>
    );
  }
}

export default Login;