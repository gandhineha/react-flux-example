/* jshint esnext: true */

import React from 'react';
class DoxHeader extends React.Component{
    render(){
      return   <nav className="light-blue lighten-1" role="navigation">
           <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
           <ul className="right hide-on-med-and-down">
           <li><a href="#">Navbar Link</a></li>
           </ul>
           <ul id="nav-mobile" className="side-nav">
           <li><a href="#">Navbar Link</a></li>
           </ul>
           <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
             </div>
           </nav>;
          }
        }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  //_onSave: function(text) {
  //  TodoActions.create(text);
  //}


module.exports = DoxHeader;
