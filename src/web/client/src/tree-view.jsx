/* jshint esnext: true */

import React from 'react';
import TreeView from 'react-treeview';

//import './stylesheets/treeview.css';
//requireCSS ("../stylesheets/treeview.css");
//Require ('custom-css');
//import treeview-css from './stylesheets/treeview.css';
class MyTreeView extends React.Component{
  render(){
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

    return (
      <div>
        {dataSource.map(function(node, i) {
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
}

module.exports = MyTreeView;
//React.renderComponent(<MyTreeView dataSource={dataSource} />, document.body);
// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.


//React.render(
//  <CompanyPeople dataSource={dataSource} />,
//  document.getElementById('uncontrolled')
