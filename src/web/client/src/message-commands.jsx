/* jshint esnext: true */
import Alt from './alt-app';
import Request from 'superagent';
import Socket from 'socket.io-client';

class MessageCommands {
  updateCounter(count) {
    var self = this;
    Request
    .post('/web/incr')
    .send({Count:count})
    .set('Accept', 'application/json')
    .end((err, resp)=>{
        if(err !== null){
          console.log(err);
        }
    });
  }

  connectToPush(){
    var connection = Socket.connect("http://localhost:8001", { path: "/web/socket.io/" });
    connection.on("connect", function(){
      console.log("socket connected");
    });
    connection.on("update", function(content){
      console.log(content);
      messageActions.getData();
    });
  }

  getData(){
    Request.get('/web/data.json').end((err, resp)=> {
      if (err !== null){
        console.log(err);
        return;
      }

      console.log(resp);
      messageActions.dataReceived(resp.body);
    });
  }

  dataReceived(data){
    this.dispatch({data });
  }

  counterUpdated(data){
    this.dispatch({data });
  }
}

var messageActions = Alt.createActions(MessageCommands);

export default messageActions;
