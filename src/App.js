import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Thread from './components/thread/Thread.js';
import Login from './components/login/Login.js';
import Error404 from './components/error/Error404.js';

import reducer from './reducers/reducers';
import './App.css';

let store = createStore(
  reducer,
  applyMiddleware(logger)
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
        	<div className="content">
		        <Router>
		        	<Switch>
                <Route exact path="/login" component={Login}/>
	          		<Route exact path="/:threadId?" component={Thread}/>
	          		<Route component={Error404}/>
		        	</Switch>
		        </Router>
		      </div>
      	</Provider>
      </div>
    );
  }
}

export default App;
