/* jshint ignore:start */
// jscs:disable
/** @jsx React.DOM */
var React = require('react');
var InputField = require('./lib/fields/input');
var json = require("../dummy/entity.json");
var DebugElement = require('./utils/DebugElement');

var Modal       = require('./modal/Modal')
var ModalHeader = require('./modal/ModalHeader')
var ModalBody   = require('./modal/ModalBody')
var ModalFooter = require('./modal/ModalFooter')

console.log(json);
var field = json[0].fields[0];



var FieldWrapper = React.createClass({
    getInitialState: function() {
        return {value: this.props.value, }
    },
	render: function() {
		var name = this.props.field.name;
		var classes = ['testClass'];
		return (<div>
					<label htmlFor={'id_'+name}>
                        {this.props.field.label}
                    </label>
					<InputField field={this.props.field}
                        update={this.props.update}
                        className={classes} />
                        <p>{this.props.sardor}</p>
				</div>)
	}
})

var FormBody = React.createClass({
    getInitialState: function() {
        return {values:{},  };
    },
    getValues: function() {
        return this.state.values;
    },
    clear: function(){
        console.log('FormBody:clear')
        this.setState({ values:{} }, function(x){
            return this.state.values
        });
    },
    setValues: function(path,text, parsed) {
        var values = this.state.values;
        if(text === '') {
            delete values[path];
        } else {
            values[path] = parsed;
        }
        this.setState({ values:values, });
        //console.log(this.state.values);
    },
    render: function() {
        var formFields = this.props.fields.map(function(field){
            console.log();
            var value = this.state.values[ field.name ]
            return (
                <FieldWrapper field={field} value={value}
                              key={field.name} update={this.setValues} />
            );
        }, this);

        return (<form>{formFields}</form>);
    }
})


module.exports = React.createClass({
    displayName: 'HelloReact',
    getInitialState: function(){
    	return {change:false, submitted: {} };
    },
    swap: function() {
    	this.setState({change:true});
    },
    formSubmit: function() {
        var values = this.refs.FormBody.getValues();
        this.setState({change:false, submitted: values });
    },
    formClear: function() {
        console.log('HelloReact:clear')
        var values = this.refs.FormBody.clear();
        this.setState({change:false, submitted: values || {} });
    },
    render: function(){


        return <Modal />
    }
})

// <div>
//                     <ModalHeader title={'Entit Create'} />
//                     <FormBody ref={'FormBody'} fields={json[0].fields} />
//                     <button onClick={this.formSubmit} >Submit</button>
//                     <button onClick={this.formClear} >Clear</button>
//                     <DebugElement messages={this.state.submitted} label={'Debug info'}/>
//                 </div>