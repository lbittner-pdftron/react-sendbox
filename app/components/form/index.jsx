/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
var React = require('react/addons');
var parser = require('../utils/parser');
var normalizer = require('../utils/normalizer');

var Form = React.createClass({
	getInitialState: function() {
		return { isClear: false, id:0 }
	},
	clear: function(){
		event.preventDefault();
		this.setState({
			isClear: true,
			id: ++this.state.id
		})
	},
	render: function () {
		//console.log(this.state)
		var rows = this.props.fields.map(function(field){
				return (<Form.Row key={field.name+this.state.id}>
							<Form.Label label={field.label}/>
							<Form.Input {...this.state}  {...field} />
						</Form.Row>)
			}, this)

		return (<form ref={'MyForm'}>{rows}</form>)
	}
})
Form.Row = React.createClass({
	render: function() {
		React.Children.forEach(this.props.children, function(context){
			// console.log(context)
		})
		return <div>{this.props.children}</div>;
	}
})
Form.Label = React.createClass({
	render: function() {
		return <label>{this.props.label}</label>;
	}
})

Form.Input = React.createClass({
	normalize: function(text) {
		return normalizer[this.props.field.type](text);
	},
	parse: function(text) {
		return parser[this.props.field.type](text);
	},
	handleChange: function() {
		var text = this.normalize(event.target.value);
		this.props.update(this.props.field.name, text,
			this.parse(text));
	},
	render: function() {
		console.log(this.props.isClear);
		var value = '';
		if(this.props.isClear) {
			value = '';
		} else {
			value = this.props.value;
		}
		console.log(value)
		return <input type='text' name={this.props.name}
					defaultValue={value}
					onChange={this.handleChange}
					id={'id_' + this.props.name} />;
	}
})
module.exports = Form;