<header>
  <ul>
     <li><Link to="app">Dashboard</Link></li>
     <li><Link to="inbox">Inbox</Link></li>
     <li><Link to="counterControl">Counter</Link></li>
     <li><Link to="weatherControl">Weather Control</Link></li>
    Login
    <TreeControl dataSource={dataSource} />
  </ul>
</header>
     <RouteHandler/>
       var validators = {
         time: {
           regexp: /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/,
           message: 'Not valid time'
         },
         decimal: {
           regexp: /(^\d*\.?\d*[0-9]+\d*$)|(^[0-9]+\d*\.\d*$)/,
           message: 'Please type decimal value'
         },
         binary: {
           regexp: /^([0-1])*$/,
           message: '10101000'
         }
       };

       Formsy.addValidationRule('isYearOfBirth', function (values, value) {
         value = parseInt(value);
         if (typeof value !== 'number' || value !== value) {
           return false;
         }
         return value < currentYear && value > currentYear - 130;
       });

       var MyAppForm = React.createClass({
         submit: function (data) {
           alert(JSON.stringify(data, null, 4));
         },
         render: function () {
           return (
             <Formsy.Form onSubmit={this.submit} className="custom-validation">
               <MyOwnInput name="year" title="Year of Birth" type="number" validations="isYearOfBirth" validationError="Please type your year of birth" />
               <DynamicInput name="dynamic" title="..." type="text" />
               <button type="submit">Submit</button>
             </Formsy.Form>
           );
         }
       });

       var MyOwnInput = React.createClass({
         mixins: [Formsy.Mixin],
         changeValue: function (event) {
           this.setValue(event.currentTarget.value);
         },
         render: function () {
           var className = this.props.className + ' ' + (this.showError() ? 'error' : null);
           var errorMessage = this.getErrorMessage();

           return (
             <div className='form-group'>
               <label htmlFor={this.props.name}>{this.props.title}</label>
               <input type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
               <span className='validation-error'>{errorMessage}</span>
             </div>
           );
         }
       });

       var DynamicInput = React.createClass({
         mixins: [Formsy.Mixin],
         getInitialState: function() {
           return {
             validationType: 'time'
           };
         },
         changeValue: function (event) {
           this.setValue(event.currentTarget.value);
         },
         changeValidation: function(validationType) {
           this.setState({
             validationType: validationType
           });
           this.setValue(this.getValue());
         },
         validate: function () {
           var value = this.getValue();
           return value === '' ? true : validators[this.state.validationType].regexp.test(value);
         },
         getCustomErrorMessage: function() {
           return this.showError() ? validators[this.state.validationType].message : '';
         },
         render: function () {
           var className = this.props.className + ' ' + (this.showError() ? 'error' : null);
           var errorMessage = this.getCustomErrorMessage();

           return (
             <div className='form-group'>
               <label htmlFor={this.props.name}>{this.props.title}</label>
               <input type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
               <span className='validation-error'>{errorMessage}</span>
               <Validations validationType={this.state.validationType} changeValidation={this.changeValidation}/>
             </div>
           );
         }
       });

       var Validations = React.createClass({
         changeValidation: function(e) {
           this.props.changeValidation(e.target.value);
         },
         render: function() {
           return (
             <fieldset onChange={this.changeValidation}>
               <legend>Validation Type</legend>
               <div>
                 <input name='validaionType' type='radio' value='time' checked={this.props.validationType === 'time'}/>Time
               </div>
               <div>
                 <input name='validaionType' type='radio' value='decimal' checked={this.props.validationType === 'decimal'}/>Decimal
               </div>
               <div>
                 <input name='validaionType' type='radio' value='binary' checked={this.props.validationType === 'binary'}/>Binary
               </div>
             </fieldset>
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
