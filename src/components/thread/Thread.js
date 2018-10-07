import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  addMessage, 
  setMessages, 
  setCurrentMessage, 
  toggleSending,
  toggleSettings, 
  setThreads,
  addThread
} from '../../actions/threads.js';

import { 
  clearSocket 
} from '../../actions/socket.js';

import Sidebar from '../sidebar/Sidebar.js';

import './Thread.css';

class Thread extends Component {
  constructor(props) {
    super(props);
    if (!this.props.user) {
      var url = this.props.match.params.threadId ? '/login?thread=' + this.props.match.params.threadId : '/login';
      this.props.history.replace(url);
      return;
    }
    this.state = {};

    var self = this;
    var personalChannel = this.props.socket.subscribe(this.props.user.email);
    personalChannel.watch(this.props.addThread);
    personalChannel.on('subscribe', function () { 
      self.props.socket.emit('threads', null, function (err, threads) {
        if (err) {
          console.error(err);
          return;
        }
        self.props.setThreads(threads);
      });
    });
  }
  renderThread(thread) {
    return (
      <div className="thread">
        <div className="title">
          {thread.title}
        </div>
        <div className="messages">
          {this.renderMessages(thread)}
        </div>
        <div className="send">
          <input 
            type="text" 
            value={thread.currentMessage || ''}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleSendKeyPress.bind(this)} 
            placeholder="Send Message..."
          />
          <span onClick={this.handleSendClick.bind(this)}>
            <i>search</i>
          </span>
        </div>
      </div>
    );
  }
  renderMessages(thread) {
    if (!thread.messages) {
      return (
        <div className="loading-image">
          <img src="/loading.svg" alt="Loading..."/>
        </div>
      );
    }

    let items = [];
    for (var i = 0; i < thread.messages.length; i++) {
      items.push(
        <div 
          className={thread.messages[i].user === this.props.user.email ? "message" : "message mine"} 
          key={i}
        >
          <div className="user">{thread.messages[i].user}</div>
          <div className="body">{thread.messages[i].body}</div>
        </div>
      );
      
    }
    return items;
  }
  renderBlank() {
    if (this.props.match.params.threadId) {
      return (
        <div className="not-found">
          <p>Error: Chat not found</p>
        </div>
      );
    }
    return (
      <div className="home">
        <p>Select a chat!</p>
      </div>
    )
  }
  addMessage(self) {
    return function (msg) {
      self.props.addMessage(self.props.match.params.threadId, msg);
      self.props.setCurrentMessage(self.props.match.params.threadId, '');
    }
  }
  setMessages(self) {
    return function (err, msgs) {
      if (err) {
        console.error(err);
        return;
      } 
      self.props.setMessages(self.props.match.params.threadId, msgs);
    }
  }
  fetchMessages() {
    var self = this;
    var chatChannel = this.props.socket.subscribe('chat-' + this.props.match.params.threadId);
    chatChannel.watch(this.addMessage(this));
    chatChannel.on('subscribe', function () { 
      self.socket.emit(
        'thread', 
        self.props.match.params.threadId, 
        self.setMessages(self)
      );
    });
  }
  handleChange(event){
    this.props.setCurrentMessage(this.props.match.params.threadId, event.target.value);
  }
  handleSendKeyPress(event) {
    if (event.key === 'Enter'){
      this.handleSend(event.target.value);
    }
  }
  handleSendClick(event) {
    this.handleSend(event.target.value);
  }
  handleSend(message) {
    var self = this;
    var msg = {
      body: message,
      user: this.props.user.email,
      threadId: this.props.match.params.threadId
    }
    this.props.socket.emit('chat', msg, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      self.props.toggleSending();
      self.props.setCurrentMessage('');
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.threadId &&
      this.props.threads[this.props.match.params.threadId] && 
      !this.props.threads[this.props.match.params.threadId].messages) {
      this.fetchMessages();
    }
  }
  render() {
    if (!this.props.threads) {
      return (
        <div className="container loading-image">
          <img src="/loading.svg" alt="Loading..."/>
        </div>
      );
    }
    var thread = this.props.threads[this.props.match.params.threadId];
    return (
      <div className="container">
        <Sidebar selected={this.props.match.params.threadId}/>
        { thread ? this.renderThread(thread) : this.renderBlank() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
     threads: state.threads,
     user: state.user,
     socket: state.socket
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMessage,
    setMessages,
    setCurrentMessage,
    toggleSettings,
    toggleSending,
    setThreads,
    addThread,
    clearSocket
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
