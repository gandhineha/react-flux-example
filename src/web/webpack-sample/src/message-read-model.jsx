import Alt from './alt-app'
import MessageCommands from './message-commands'
import Request from 'superagent';

class MessageReadModel{
  constructor() {
    this.bindListeners({
      dataReceived: MessageCommands.dataReceived
    });

    this.data = { "Message": "loading...","Count":"..."};
    MessageCommands.getData()    
  }

  dataReceived({ data }) {
    console.log("Readmode updated")
    this.setState({data: data})
  }
}

export default Alt.createStore(MessageReadModel, 'MessageReadModel');
