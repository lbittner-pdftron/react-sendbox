/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var $ = React.DOM;
var cx = require('classnames');

var InputField = React.createClass({
	render: function () {

		return <input type='text' 
					className={cx(this.props.className)}
					name={this.props.field.name}
					defaultValue='val'
					id={'id_' + this.props.field.name} />
		
	}
})
module.exports = InputField;