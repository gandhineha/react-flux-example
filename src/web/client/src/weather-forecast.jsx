/* jshint esnext: true */

import React from 'react';
import SuperAgent from 'superagent';

class WeatherForecast extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    var code = this.props.countrydata.countrycode;
    var city = this.props.countrydata.city;
    // call API
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${code}`;
    console.log("Weather requesting:",url);
    SuperAgent.get(url).end((err, response)=>{
      console.log("Weather Response:", response);
        this.setState(response.body);
    });
  }

  render(){
    if(this.state.main === undefined){
      return <h1>loading...</h1>;
    }

    return  <div>
              <h1>Weather Control</h1>
              <h2>Country : {this.state.name}</h2>
            //  <h2>Sea Level : {this.state.main.sea_level}</h2>  <h2>Temp Max : {this.state.main.temp_max}</h2>  <h2>Pressure : {this.state.main.pressure}</h2>
            </div>;
  }
}

module.exports = WeatherForecast;
