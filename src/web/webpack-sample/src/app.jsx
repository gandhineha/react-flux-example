/* jshint esnext: true */

'use strict';

import React from 'react';
import MessageCommands from './message-commands'
import MessageReadModel from './message-read-model'

class SharedCounter extends React.Component{
  constructor(props){
    super(props)
    var self = this
    this.state = MessageReadModel.getState().data
    console.log(this.state)
    this.updateHandler = ()=> self.refreshData()
  }

  refreshData(){
    this.setState(MessageReadModel.getState().data)
  }

  componentWillMount(){
    MessageReadModel.listen(this.updateHandler)
  }

  componentWillUnmount(){
    MessageReadModel.unlisten(this.updateHandler)
  }

  onClick(){
    MessageCommands.updateCounter(1)
  }

  render(){
    return  <div>
              <h1>Shared Counter</h1>
              <p>Open multiple browser windows/tabs to see the counter updated in real time using ReactJS + Flux/Alt</p>              
              <h2>{this.state.Message}</h2>
              <h2>{this.state.Count}</h2>
              <button onClick={this.onClick}>Increment counter</button>
            </div>
  }
}

MessageCommands.connectToPush()

React.render(<SharedCounter />, document.body);

// If hot swapping can be done, do it by resolving the current route
// and render the application again
if (module.hot) {
  module.hot.accept();
}
