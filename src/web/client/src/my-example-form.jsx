/* jshint esnext: true */
var React = require('react');
import './stylesheets/my-example-form.css';
//var Formsy = require('formsy-react');
   var Adaptive_Input = React.createClass({
     handle_change: function(){
       var new_text = this.refs.input.getDOMNode().value;
       this.props.on_Input_Change(new_text);
     },
     render: function(){
       return (
           <div className='adaptive_placeholder_input_container'>
             <input
               className="adaptive_input"
               type="text"
               required="required"
               onChange= {this.handle_change}
               ref="input"
             ></input>
             <label
               className="adaptive_placeholder"
               alt={this.props.initial}
               placeholder={this.props.focused}
             ></label>
           </div>
           );
     }
   });

   var Form = React.createClass({
     render: function(){
       return (
           <form>
             <Adaptive_Input
               initial={'Name Input'}
               focused={'Name Input'}
               on_Input_Change={this.props.handle_text_input}
             />
             <Adaptive_Input
             initial={'Value 1'}
             focused={'Value 1'}
               on_Input_Change={this.props.handle_value_1_input}
             />
             <Adaptive_Input
               initial={'Value 2'}
               focused={'Value 2'}
               on_Input_Change={this.props.handle_value_2_input}
             />
           </form>
           );
     }
   });

   var Page = React.createClass({
     getInitialState: function(){
       return {
         Name : "No Name",
         Value_1 : '0',
         Value_2 : '0',
         Display_Value: '0'
       };
     },
     handle_text_input: function(new_text){
       this.setState({
           Name: new_text
         });
     },
     handle_value_1_input: function(new_value){
       new_value = parseInt(new_value);
       var updated_display = new_value + parseInt(this.state.Value_2);
       updated_display = updated_display.toString();
       this.setState({
           Value_1: new_value,
           Display_Value: updated_display
         });
     },
     handle_value_2_input: function(new_value){
       new_value = parseInt(new_value);
       var updated_display = parseInt(this.state.Value_1) + new_value;
       updated_display = updated_display.toString();
       this.setState({
           Value_2: new_value,
           Display_Value: updated_display
         });
     },
     render: function(){
       return(
           <div>
             <h2>{this.state.Name}</h2>
             <h2 className='test'>Value 1 + Value 2 = {this.state.Display_Value}</h2>
             <Form
               handle_text_input={this.handle_text_input}
               handle_value_1_input = {this.handle_value_1_input}
               handle_value_2_input = {this.handle_value_2_input}
             />

           </div>
       );
     }
   });

//React.renderComponent(<Page />, document.body);
module.exports = Page;
