
/* jshint esnext: true */

import React from 'react';
class DoxSubContent extends React.Component{
    render(){
      return   <div className="container">
         <div className="section">
           <div className="row">
             <div className="col s12 m4">
               <div className="icon-block">
                 <h2 className="center light-blue-text"><i className="mdi-image-flash-on"></i></h2>
                 <h5 className="center">Speeds up development</h5>
                 <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
               </div>
             </div>
             <div className="col s12 m4">
               <div className="icon-block">
                 <h2 className="center light-blue-text"><i className="mdi-social-group"></i></h2>
                 <h5 className="center">User Experience Focused</h5>

                 <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
               </div>
             </div>

             <div className="col s12 m4">
               <div className="icon-block">
                 <h2 className="center light-blue-text"><i className="mdi-action-settings"></i></h2>
                 <h5 className="center">Easy to work with</h5>

                 <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
               </div>
             </div>
           </div>

         </div>
         <br></br>
         <div className="section">
         </div>
       </div>;
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


module.exports = DoxSubContent;
