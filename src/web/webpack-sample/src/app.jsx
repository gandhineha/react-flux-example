/* jshint esnext: true */

import React from 'react';
import Request from 'superagent';
import Socket from 'socket.io-client'

function GetData(){
  return new Promise((resolve, reject) => {
      Request.get('/web/data.json').end((err, resp)=> {
        if (err === null){
          resolve(resp)
        }else{
          reject(err)
        }
      })
    })
}

class SharedCounter extends React.Component{
  constructor(props){
    super(props)
  }

  getData(){
    var self = this
    this.setState({loading:true, data:"loading"})
    GetData().then((resp)=> {
      self.setState({loading:false, data: resp.body})
    })
  }

  componentWillMount(){
    this.getData()
    var self = this

    var connection = Socket.connect("http://localhost:8001", { path: "/web/socket.io/" })
    connection.on("connect", function(){
      console.log("socket connected")
    })
    connection.on("update", function(content){
      console.log(content)
      // self.setState({loading:false, data: content})
      self.getData()
    })
  }

  onClick(){
    Request
    .post('/web/incr')
    .send({Count:1})
    .set('Accept', 'application/json')
    .end((err, resp)=>{
        if(err !== null){
          console.log(err)
        }
    })
  }

  render(){
    return  <div>
              <h1>{this.state.data.Message}</h1>
              <h2>{this.state.data.Count}</h2>
              <button onClick={this.onClick}>Incr</button>
            </div>
  }
}

React.render(<SharedCounter />, document.body);

// If hot swapping can be done, do it by resolving the current route
// and render the application again
if (module.hot) {
  module.hot.accept();
}
