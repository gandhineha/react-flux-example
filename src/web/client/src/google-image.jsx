/* jshint esnext: true */
import React from 'react';
var image = require('./sample-image.jpg');

class GoogleImage extends React.Component{
  render(){
    return <div>
              <h1>Sample Image</h1>
              <img src={image}></img>
            </div>;
  }
}

module.exports = GoogleImage;
