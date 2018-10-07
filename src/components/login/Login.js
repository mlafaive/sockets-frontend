import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as qs from 'query-string';

import { setUser } from '../../actions/user.js';

import { 
  createSocket 
} from '../../actions/socket.js';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    if (this.props.user) {
      this.props.history.replace('/');
    }
    this.state = {};

    this.props.createSocket();
  }
  onSignIn(response){
    var user = {
      email: response.profileObj.email,
      tokenId: response.tokenId
    };
    var self = this;
    this.props.socket.emit('login', user, function (err, threads) {
      if (err) {
        console.error(err);
        return;
      }
      self.props.setUser(response.profileObj.email, response.tokenId);
      var url = qs.parse(self.props.location.search).thread ? '/' + qs.parse(self.props.location.search).thread : '/';
      self.props.history.push(url);
    });
  }
  onSignInFailure(response) {
    console.error(response);
  }
  render() {
    if (!this.props.socket) {
      return (
        <div className="container loading-image">
          <img src="/loading.svg" alt="Loading..."/>
        </div>
      );
    }
    return (
      <div className="login">
        <GoogleLogin
          clientId="117438755761-v2v4q06ts58pddsng2is1kbr48ulamre.apps.googleusercontent.com"
          onSuccess={this.onSignIn.bind(this)}
          onFailure={this.onSignInFailure.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
     user: state.user,
     socket: state.socket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUser,
    createSocket
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
