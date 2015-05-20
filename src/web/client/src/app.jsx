/* jshint esnext: true */
import MaterializeCSS from 'materialize.css';
import MaterializJS from 'materialize';
import TreeViewCSS from 'react-treeview.css';
import React from 'react';
import Router from 'react-router';
import TreeView from 'react-treeview';
import { DefaultRoute, Link, Route, RouteHandler , NotFoundRoute} from 'react-router';
import MessageCommands from './message-commands';
import MessageReadModel from './message-read-model';
import WeatherForecast from './weather-forecast';
import Inbox from './inbox';
import DoxHeader from './layout/header';
import DoxFooter from './layout/footer';
import DoxSubContent from './layout/sub-content';
import TestSection from './test-section';
import Page from './my-example-form';
//import MyAppForm from './my-example-form';
import MyTreeView from './tree-view';
//import TreeControl from './tree-view';

class SharedCounter extends React.Component{
  constructor(props){
    super(props);
    var self = this;
    this.state = MessageReadModel.getState().data;
    console.log(this.state);
    this.updateHandler = ()=> self.refreshData();
  }

  refreshData(){
    this.setState(MessageReadModel.getState().data);
  }

  componentWillMount(){
    MessageReadModel.listen(this.updateHandler);
  }

  componentWillUnmount(){
    MessageReadModel.unlisten(this.updateHandler);
  }

  onClick(){
    MessageCommands.updateCounter(1);
  }

  render(){
    return  <div>
              <h2>{this.state.Message}</h2>
              <h2>{this.state.Count}</h2>
              <button onClick={this.onClick}>Increment counter</button>
            </div>;
  }
}

var locations = [
  {countrycode: "de", city: "munich"},//  {countrycode: "uk", city: "london"}
];

class App extends React.Component{
  render(){
    return <div>
    <DoxHeader></DoxHeader>
      <div className="section no-pad-bot" id="index-banner">
      <div className="container" id="myContent">
          <br></br>
          <h1 className="header center orange-text">Starter Template</h1>
          <div className="row center">
            <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              <li><Link to="test">Dynamic Control</Link></li>
              <li><Link to="weatherControl">Weather Control</Link></li>
              <li><Link to="app">Dashboard</Link></li>
              <li><Link to="inbox">Inbox</Link></li>
              <li><Link to="counterControl">Counter</Link></li>
              <li><Link to="page">Form</Link></li>
              <li><Link to="treeview" >Treecontrol</Link></li>
             Login


              <RouteHandler/>
          </div>

          <div className="row center">
            <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light orange">Get Started</a>
          </div>
          <br></br>
      </div>
      </div>
            <DoxSubContent></DoxSubContent>
            <DoxFooter></DoxFooter>
           </div>;
  }
}

// <TreeControl dataSource={dataSource} />
var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
      Default view
      </div>
    );
  }
});

var CounterControl = React.createClass({
  render: function()
  {
    return (
      <div className="row">
        <div className="col s4">
          <SharedCounter />
        </div>
      </div>
    );
  }
});

var WeatherControl = React.createClass({
  render: function () {
    var controls = locations.map(function(location){
                      return <WeatherForecast
                        key={location.countrycode}
                        countrydata={location}/>;
                    });
    return (
      <div>
        My Weather control
        {controls}
      </div>
    );
  }
});

var dataSource = [
  {
    type: 'Employees',
    collapsed: false,
    people: [
      {name: 'Paul Gordon', age: 25, sex: 'male', role: 'coder', collapsed: false},
      {name: 'Sarah Lee', age: 23, sex: 'female', role: 'jqueryer', collapsed: false},
    ]
  },
  {
    type: 'CEO',
    collapsed: false,
    people: [
      {name: 'Drew Anderson', age: 35, sex: 'male', role: 'boss', collapsed: false}
    ]
  }
];
var TreeControl = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.dataSource.map(function(node, i) {
          var type = node.type;
          var label = <span className="node">{type}</span>;
          return (
            <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
              {node.people.map(function(person, j) {
                var label = <span className="node">{person.name}</span>;
                return (
                  <TreeView nodeLabel={label} key={person.name} defaultCollapsed={false}>
                    <div className="info">age: {person.age}</div>
                    <div className="info">sex: {person.sex}</div>
                    <div className="info">role: {person.role}</div>
                  </TreeView>
                );
              })}
            </TreeView>
          );
        }, this)}
      </div>
    );
  }
});

var InboxNotFound = React.createClass({
  render: function () {
    return (
      <div>
      Page not found
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="test" handler={TestSection}>
    </Route>
    <Route name="inbox" handler={Inbox}/>
    <Route name="page" handler={Page}/>
    <Route name="weatherControl" handler={WeatherControl}/>
    <Route name="counterControl" handler={CounterControl}/>
    <Route name="treeview" handler={MyTreeView}/>
    <NotFoundRoute handler={InboxNotFound}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

MessageCommands.connectToPush();
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

//React.render(<App />, document.body);
// If hot swapping can be done, do it by resolving the current route
// and render the application again
if (module.hot) {
  module.hot.accept();
}
