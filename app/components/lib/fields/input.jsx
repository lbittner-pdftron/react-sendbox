/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var $ = React.DOM;
var cx = require('classnames');
var parser = require('../../utils/parser');
var normalizer = require('../../utils/normalizer');

var InputField = React.createClass({
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
	render: function () {

		return <input type='text'
					className={cx(this.props.className)}
					name={this.props.field.name}
					defaultValue={this.props.value || ''}
					onChange={this.handleChange}
					id={'id_' + this.props.field.name} />

	}
})
module.exports = InputField;