/* jshint esnext: true */
import React from 'react';

class TestSection extends React.Component{
  constructor(){
    super();
    this.state = {loading: true};
  }

  componentWillMount(){
    var self = this;
    console.log('mounting...');
    require.ensure([], function(require) {
      var GoogleImage = require("./google-image");
      console.log(GoogleImage);
      var control = <GoogleImage/>;

      self.setState({loading: false, control: control});
    });
  }

  render(){
    if(this.state.loading === true){
      return <div>
              <h1>Loading...</h1>
              </div>;
    }

    var control = this.state.control;
    console.log("rendering ", control);
    return <div>
            <h1>Loaded Successfully</h1>
            {control}
          </div>;
  }
}

module.exports = TestSection;
