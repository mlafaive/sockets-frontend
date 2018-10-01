import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sidebar.css';

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('sidebar', props);
  }
  render() {
    return (
      <div className="sidebar">
        Sidebar
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    url: state.currentUrl,
  };
}

export default connect(mapStateToProps)(Thread);